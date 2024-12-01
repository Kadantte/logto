import crypto from 'node:crypto';

import {
  type SamlApplicationResponse,
  type Application,
  type SamlApplicationConfig,
  type SamlAcsUrl,
  BindingType,
} from '@logto/schemas';
import { addDays } from 'date-fns';
import forge from 'node-forge';

import RequestError from '#src/errors/RequestError/index.js';
import assertThat from '#src/utils/assert-that.js';

export const generateKeyPairAndCertificate = async (lifeSpanInDays = 365) => {
  const keypair = forge.pki.rsa.generateKeyPair({ bits: 4096 });
  return createCertificate(keypair, lifeSpanInDays);
};

const createCertificate = (keypair: forge.pki.KeyPair, lifeSpanInDays: number) => {
  const cert = forge.pki.createCertificate();
  const notBefore = new Date();
  const notAfter = addDays(notBefore, lifeSpanInDays);

  // Can not initialize the certificate with the keypair directly, so we need to set the public key manually.
  /* eslint-disable @silverhand/fp/no-mutation */
  cert.publicKey = keypair.publicKey;
  // Use cryptographically secure pseudorandom number generator (CSPRNG) to generate a random serial number (usually more than 8 bytes).
  // `serialNumber` should be IDENTICAL across different certificates, better not to be incremental.
  cert.serialNumber = crypto.randomBytes(16).toString('hex');
  cert.validity.notBefore = notBefore;
  cert.validity.notAfter = notAfter;
  /* eslint-enable @silverhand/fp/no-mutation */

  // TODO: read from tenant config or let user customize before downloading
  const subjectAttributes: forge.pki.CertificateField[] = [
    {
      name: 'commonName',
      value: 'example.com',
    },
  ];

  const issuerAttributes: forge.pki.CertificateField[] = [
    {
      name: 'commonName',
      value: 'logto.io',
    },
    {
      name: 'organizationName',
      value: 'Logto',
    },
    {
      name: 'countryName',
      value: 'US',
    },
  ];

  cert.setSubject(subjectAttributes);
  cert.setIssuer(issuerAttributes);
  cert.sign(keypair.privateKey);

  return {
    privateKey: forge.pki.privateKeyToPem(keypair.privateKey),
    certificate: forge.pki.certificateToPem(cert),
    notAfter,
  };
};

/**
 * According to the design, a SAML app will be associated with multiple records from various tables.
 * Therefore, when complete SAML app data is required, it is necessary to retrieve multiple related records and assemble them into a comprehensive SAML app dataset. This dataset includes:
 * - A record from the `applications` table with a `type` of `SAML`
 * - A record from the `saml_application_configs` table
 */
export const ensembleSamlApplication = ({
  application,
  samlConfig,
}: {
  application: Application;
  samlConfig: Pick<SamlApplicationConfig, 'attributeMapping' | 'entityId' | 'acsUrl'>;
}): SamlApplicationResponse => {
  return {
    ...application,
    ...samlConfig,
  };
};

/**
 * Only HTTP-POST binding is supported for receiving SAML assertions at the moment.
 */
export const validateAcsUrl = (acsUrl: SamlAcsUrl) => {
  const { binding } = acsUrl;
  assertThat(
    binding === BindingType.POST,
    new RequestError({
      code: 'application.saml.acs_url_binding_not_supported',
      status: 422,
    })
  );
};
