import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import Button from '@/components/Button';
import VerificationCodeInput from '@/components/VerificationCode';
import { type UserMfaFlow } from '@/types';

import styles from './index.module.scss';
import useTotpCodeVerification from './use-totp-code-verification';

const totpCodeLength = 6;

const isCodeReady = (code: string[]) => {
  return code.length === totpCodeLength && code.every(Boolean);
};

type Props = {
  readonly flow: UserMfaFlow;
};

const TotpCodeVerification = ({ flow }: Props) => {
  const { t } = useTranslation();

  const [codeInput, setCodeInput] = useState<string[]>([]);
  const [inputErrorMessage, setInputErrorMessage] = useState<string>();

  const errorCallback = useCallback(() => {
    setCodeInput([]);
    setInputErrorMessage(undefined);
  }, []);

  const { errorMessage: submitErrorMessage, onSubmit } = useTotpCodeVerification(
    flow,
    errorCallback
  );

  const [isSubmitting, setIsSubmitting] = useState(false);

  const errorMessage = inputErrorMessage ?? submitErrorMessage;

  const handleSubmit = useCallback(
    async (code: string[]) => {
      if (isSubmitting) {
        return;
      }

      setInputErrorMessage(undefined);
      setIsSubmitting(true);
      await onSubmit(code.join(''));
      setIsSubmitting(false);
    },
    [onSubmit, isSubmitting]
  );

  return (
    <>
      <VerificationCodeInput
        name="totpCode"
        value={codeInput}
        className={styles.totpCodeInput}
        error={errorMessage}
        onChange={(code) => {
          setCodeInput(code);
          if (isCodeReady(code)) {
            void handleSubmit(code);
          }
        }}
      />
      <Button
        title="action.continue"
        type="primary"
        className={styles.continueButton}
        isLoading={isSubmitting}
        onClick={() => {
          if (!isCodeReady(codeInput)) {
            setInputErrorMessage(t('error.invalid_passcode'));
            return;
          }

          void handleSubmit(codeInput);
        }}
      />
    </>
  );
};

export default TotpCodeVerification;
