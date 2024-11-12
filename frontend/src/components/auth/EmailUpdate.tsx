import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';
import { MuiTelInput } from 'mui-tel-input';
import dayjs, { Dayjs } from 'dayjs';
import { useVerification } from '@/hooks/useVerification';
import styled from 'styled-components';

const EmailUpdate = () => {
  const navigate = useNavigate();
  const [birthDate, setBirthDate] = useState<Dayjs | null>(null);
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const {
    isVerificationSent,
    isVerified,
    verificationCode,
    codeError,
    setVerificationCode,
    handleVerificationClick,
    handleVerifyCode,
  } = useVerification();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate('/');
  };

  const handlePhoneChange = (newPhone: string) => {
    setPhoneNumber(newPhone);
  };

  return (
    <Container>
      <Wrapper>
        <Title>인증하기</Title>
        <form onSubmit={handleSubmit}>
          <InputGroup>
            <InputTitle>보호대상자</InputTitle>
            <Input type="password" />
          </InputGroup>
          <InputGroup>
            <InputTitle>보호대상자 생년월일</InputTitle>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateField
                value={birthDate}
                onChange={(newValue) => setBirthDate(newValue)}
                fullWidth
                sx={{
                  backgroundColor: '#fff',
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: '#ccc',
                    },
                    '&:hover fieldset': {
                      borderColor: '#999',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#000',
                    },
                  },
                }}
              />
            </LocalizationProvider>
          </InputGroup>
          <InputGroup>
            <InputTitle>알람 연락망</InputTitle>
            <Input type="email" placeholder="이메일을 입력해주세요." />
          </InputGroup>

          <InputGroup style={{ position: 'relative' }}>
            <InputTitle>전화번호</InputTitle>
            <PhoneInputWrapper>
              <MuiTelInput
                value={phoneNumber}
                onChange={handlePhoneChange}
                defaultCountry="KR"
                fullWidth
                disabled={isVerified}
                sx={{
                  backgroundColor: '#fff',
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: '#ccc',
                    },
                    '&:hover fieldset': {
                      borderColor: '#999',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#000',
                    },
                  },
                }}
              />
              <VerificationButton
                type="button"
                onClick={handleVerificationClick}
                disabled={isVerified}
                isVerified={isVerified}
              >
                {isVerified ? '인증완료' : '인증하기'}
              </VerificationButton>
            </PhoneInputWrapper>
          </InputGroup>

          {isVerificationSent && (
            <>
              <InputGroup>
                <InputTitle>인증번호 입력</InputTitle>
                <Input
                  type="text"
                  placeholder="인증번호를 입력해주세요."
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                />
                {codeError && <ErrorMessage>유효하지 않은 인증번호입니다.</ErrorMessage>}
              </InputGroup>
              <VerificationSubmitButton type="button" onClick={handleVerifyCode}>
                인증
              </VerificationSubmitButton>
            </>
          )}

          <SubmitButton type="submit" value="인증완료" />
        </form>
        <SignUpPrompt>
          <StyledLink href="/login">로그인 페이지로 돌아가기</StyledLink>
        </SignUpPrompt>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: auto;
  text-align: center;
  padding-top: 80px; /* 헤더 영역 확보를 위해 패딩 추가 */
  padding-bottom: 200px; /* 하단 여백을 넉넉히 추가 */

  @media (max-width: 768px) {
    padding: 10px;
    height: auto;
  }
`;

const Wrapper = styled.div`
  max-width: 450px;
  width: 100%;
  padding-top: 20px; /* 추가 padding으로 공간 확보 */
`;

const Title = styled.p`
  font-size: 38px;
  font-weight: bold;
  margin-bottom: 6px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 5px;
`;

const InputTitle = styled.p`
  text-align: left;
  font-size: 14px;
  margin-bottom: 6px;
`;

const Input = styled.input`
  max-width: 430px;
  width: 100%;
  height: 30px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;

  @media (max-width: 480px) {
    width: 95%;

    &::placeholder {
      font-size: 12px;
    }
  }

  &::placeholder {
    color: #999;
  }
`;

const PhoneInputWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  position: relative;
`;

const StyledLink = styled.a`
  font-weight: bold;
  text-decoration: underline;
  color: #000;
  &:hover {
    text-decoration: none;
  }
`;

const SubmitButton = styled.input`
  width: 100%;
  height: 40px;
  background-color: #000;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  margin-top: 20px;
  cursor: pointer;
  &:hover {
    background-color: #fff;
    color: #000;
    border: 1px solid #999;
    transition: 0.2s ease-in;
  }
`;

const VerificationButton = styled.button<{ isVerified: boolean }>`
  position: absolute;
  right: 10px;
  z-index: 1;
  height: 40px;
  background-color: ${({ isVerified }) => (isVerified ? '#999' : '#000')};
  color: ${({ isVerified }) => (isVerified ? '#fff' : 'white')};
  font-size: 14px;
  border: none;
  border-radius: 4px;
  padding: 0 10px;
  cursor: ${({ isVerified }) => (isVerified ? 'default' : 'pointer')};
  &:hover {
    background-color: ${({ isVerified }) => (isVerified ? '#999' : '#fff')};
    color: ${({ isVerified }) => (isVerified ? '#fff' : '#000')};
    border: ${({ isVerified }) => (isVerified ? 'none' : '1px solid #999')};
    transition: 0.2s ease-in;
  }
`;

const VerificationSubmitButton = styled.button`
  width: 100%;
  height: 40px;
  background-color: #000;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  margin-top: 20px;
  cursor: pointer;
  &:hover {
    background-color: #fff;
    color: #000;
    border: 1px solid #999;
    transition: 0.2s ease-in;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 12px;
  margin-top: 5px;
  margin-bottom: 0;
`;

const SignUpPrompt = styled.p`
  margin-top: 20px;
`;

export default EmailUpdate;
