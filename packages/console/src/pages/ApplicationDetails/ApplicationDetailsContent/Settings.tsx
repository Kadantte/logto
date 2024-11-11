import { validateRedirectUrl } from '@logto/core-kit';
import type { Application } from '@logto/schemas';
import { ApplicationType } from '@logto/schemas';
import { Controller, useFormContext } from 'react-hook-form';
import { Trans, useTranslation } from 'react-i18next';

import FormCard from '@/components/FormCard';
import MultiTextInputField from '@/components/MultiTextInputField';
import { isDevFeaturesEnabled } from '@/consts/env';
import CodeEditor from '@/ds-components/CodeEditor';
import FormField from '@/ds-components/FormField';
import type { MultiTextInputRule } from '@/ds-components/MultiTextInput/types';
import {
  convertRhfErrorMessage,
  createValidatorForRhf,
} from '@/ds-components/MultiTextInput/utils';
import TextInput from '@/ds-components/TextInput';
import TextLink from '@/ds-components/TextLink';
import useDocumentationUrl from '@/hooks/use-documentation-url';
import { isJsonObject } from '@/utils/json';
import { uriValidator } from '@/utils/validator';

import ProtectedAppSettings from './ProtectedAppSettings';
import { type ApplicationForm } from './utils';

type Props = {
  readonly data: Application;
};

function Settings({ data }: Props) {
  const { t } = useTranslation(undefined, { keyPrefix: 'admin_console' });
  const { getDocumentationUrl } = useDocumentationUrl();
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<ApplicationForm>();

  const { type: applicationType, isThirdParty } = data;

  const isNativeApp = applicationType === ApplicationType.Native;
  const isProtectedApp = applicationType === ApplicationType.Protected;
  // TODO: Remove dev features check after the feature is ready for production
  const showUnknownSessionFallbackUri =
    (applicationType === ApplicationType.Traditional || applicationType === ApplicationType.SPA) &&
    !isThirdParty &&
    isDevFeaturesEnabled;

  const uriPatternRules: MultiTextInputRule = {
    pattern: {
      verify: (value) => !value || validateRedirectUrl(value, isNativeApp ? 'mobile' : 'web'),
      message: t('errors.invalid_uri_format'),
    },
  };

  if (isProtectedApp) {
    return <ProtectedAppSettings data={data} />;
  }

  return (
    <FormCard
      title="application_details.settings"
      description="application_details.settings_description"
      learnMoreLink={{
        href: getDocumentationUrl('/docs/references/applications'),
        targetBlank: 'noopener',
      }}
    >
      <FormField isRequired title="application_details.application_name">
        <TextInput
          {...register('name', { required: true })}
          error={Boolean(errors.name)}
          placeholder={t('application_details.application_name_placeholder')}
        />
      </FormField>
      <FormField title="application_details.description">
        <TextInput
          {...register('description')}
          placeholder={t('application_details.description_placeholder')}
        />
      </FormField>
      {applicationType !== ApplicationType.MachineToMachine && (
        <Controller
          name="oidcClientMetadata.redirectUris"
          control={control}
          defaultValue={[]}
          rules={{
            validate: createValidatorForRhf({
              ...uriPatternRules,
              required: t('application_details.redirect_uri_required'),
            }),
          }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <MultiTextInputField
              isRequired
              title="application_details.redirect_uris"
              tip={(closeTipHandler) => (
                <Trans
                  components={{
                    a: (
                      <TextLink
                        targetBlank
                        href="https://openid.net/specs/openid-connect-core-1_0.html#AuthRequest"
                        onClick={closeTipHandler}
                      />
                    ),
                  }}
                >
                  {t('application_details.redirect_uri_tip')}
                </Trans>
              )}
              value={value}
              error={convertRhfErrorMessage(error?.message)}
              placeholder={
                applicationType === ApplicationType.Native
                  ? t('application_details.redirect_uri_placeholder_native')
                  : t('application_details.redirect_uri_placeholder')
              }
              onChange={onChange}
            />
          )}
        />
      )}
      {applicationType !== ApplicationType.MachineToMachine && (
        <Controller
          name="oidcClientMetadata.postLogoutRedirectUris"
          control={control}
          defaultValue={[]}
          rules={{
            validate: createValidatorForRhf(uriPatternRules),
          }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <MultiTextInputField
              title="application_details.post_sign_out_redirect_uris"
              tip={t('application_details.post_sign_out_redirect_uri_tip')}
              value={value}
              error={convertRhfErrorMessage(error?.message)}
              placeholder={t('application_details.post_sign_out_redirect_uri_placeholder')}
              onChange={onChange}
            />
          )}
        />
      )}
      {applicationType !== ApplicationType.MachineToMachine && (
        <Controller
          name="customClientMetadata.corsAllowedOrigins"
          control={control}
          defaultValue={[]}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <MultiTextInputField
              title="application_details.cors_allowed_origins"
              tip={(closeTipHandler) => (
                <Trans
                  components={{
                    a: (
                      <TextLink
                        targetBlank
                        href="https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS"
                        onClick={closeTipHandler}
                      />
                    ),
                  }}
                >
                  {t('application_details.cors_allowed_origins_tip')}
                </Trans>
              )}
              value={value}
              error={convertRhfErrorMessage(error?.message)}
              placeholder={t('application_details.cors_allowed_origins_placeholder')}
              onChange={onChange}
            />
          )}
        />
      )}
      {showUnknownSessionFallbackUri && (
        <FormField
          title="application_details.field_unknown_session_fallback_uri"
          tip={t('application_details.field_unknown_session_fallback_uri_tip')}
        >
          <TextInput
            {...register('unknownSessionFallbackUri', {
              validate: (value) => !value || uriValidator(value) || t('errors.invalid_uri_format'),
            })}
            error={errors.unknownSessionFallbackUri?.message}
            placeholder={t('application_details.post_sign_out_redirect_uri_placeholder')}
          />
        </FormField>
      )}
      <Controller
        name="customData"
        control={control}
        defaultValue="{}"
        rules={{
          validate: (value) =>
            isJsonObject(value ?? '') ? true : t('application_details.custom_data_invalid'),
        }}
        render={({ field: { value, onChange } }) => (
          <FormField
            title="application_details.field_custom_data"
            tip={t('application_details.field_custom_data_tip')}
          >
            <CodeEditor
              language="json"
              value={value}
              error={errors.customData?.message}
              onChange={onChange}
            />
          </FormField>
        )}
      />
    </FormCard>
  );
}

export default Settings;
