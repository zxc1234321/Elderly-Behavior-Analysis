import { useState } from 'react';

export const useVerification = () => {
  const [isVerificationSent, setIsVerificationSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [codeError, setCodeError] = useState(false);

  const handleVerificationClick = () => {
    setIsVerificationSent(true);
  };

  const handleVerifyCode = () => {
    if (verificationCode === "123456") {
      setIsVerified(true);
      setIsVerificationSent(false);
      setCodeError(false);
    } else {
      setCodeError(true);
    }
  };

  return {
    isVerificationSent,
    isVerified,
    verificationCode,
    codeError,
    setVerificationCode,
    handleVerificationClick,
    handleVerifyCode,
  };
};
