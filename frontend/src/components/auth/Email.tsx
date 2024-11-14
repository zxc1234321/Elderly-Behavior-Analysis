import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Email = () => {
  const navigate = useNavigate();
  const [isVerificationSent, setVerificationSent] = useState(false); // 이메일 인증 요청 상태
  const [isVerified, setVerified] = useState(false); // 이메일 인증 완료 상태

  const handleVerificationRequest = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const email = (e.target as HTMLFormElement).email.value;

      // 이메일 인증 요청
      await axios.post('http://localhost:3000/auth/send-email-verification', { email });
      setVerificationSent(true);  // 인증 요청 완료 상태 설정

      // 인증 확인 - 반복 확인 (폴링)
      const interval = setInterval(async () => {
        try {
          const response = await axios.get(`http://localhost:3000/auth/check-email-verification?email=${email}`);
          if (response.data.verified) {
            setVerified(true);  // 인증 완료 상태 설정
            clearInterval(interval);  // 인증 완료되면 폴링 중지
          }
        } catch (error) {
          console.error('이메일 인증 확인 실패:', error);
        }
      }, 3000);  // 3초마다 인증 상태 확인
    } catch (error) {
      console.error('이메일 인증 요청 실패:', error);
    }
  };

  const handleNext = () => {
    navigate('/email-update');  // 이메일 인증이 완료되면 페이지 이동
  };

  return (
    <Container>
      <Wrapper>
        <Title>이메일 인증하기</Title>
        <SubTitle>이메일 인증을 완료하고 본인인증을 완료하세요.</SubTitle>
        <form onSubmit={handleVerificationRequest}>
          <InputGroup>
            <InputTitle>이메일</InputTitle>
            <Input type="email" name="email" required />
          </InputGroup>

          <ActionButton
            type="submit"
            disabled={isVerificationSent && !isVerified}  // 인증 요청 후 비활성화, 인증 완료 시 활성화
            onClick={isVerified ? handleNext : undefined}  // 인증 완료 시 다음으로 이동
          >
            {isVerificationSent ? (isVerified ? '다음으로' : '이메일 인증 확인 중...') : '이메일 인증하기'}
          </ActionButton>
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
  height: 80vh;
  text-align: center;

  @media (max-width: 768px) {
    padding: 10px;
    height: 80vh;
  }
`;

const Wrapper = styled.div`
  max-width: 450px;
  width: 100%;
`;

const Title = styled.p`
  font-size: 38px;
  font-weight: bold;
  margin-bottom: 6px;
`;

const SubTitle = styled.p`
  color: #999;
  font-size: 16px;
  margin-top: 0;
  margin-bottom: 10px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 15px;
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
    width: 94.5%;
  }
`;

const ActionButton = styled.button`
  width: 100%;
  height: 40px;
  background-color: #000;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  margin-top: 40px;
  cursor: pointer;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    border: 1px solid #999;
    background-color: #fff;
    color: #000;
    transition: 0.2s ease-in;
  }

  @media (max-width: 480px) {
    margin-top: 30px;
  }
`;

const SignUpPrompt = styled.p`
  margin-top: 20px;
`;

const StyledLink = styled.a`
  font-weight: bold;
  text-decoration: underline;
  color: #000;
  &:hover {
    text-decoration: none;
  }
`;

export default Email;
