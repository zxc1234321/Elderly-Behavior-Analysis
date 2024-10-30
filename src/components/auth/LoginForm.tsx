import { useState } from 'react';
import { useAuthStore } from '@/store/auth/authStore';
import styled from 'styled-components';

const LoginForm = () => {
  const [rememberMe, setRememberMe] = useState(false);
  const { login } = useAuthStore();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = 'mock_token';
    login(token);
  };

  return (
    <LoginContainer>
      <LoginWrapper>
        <Title>로그인</Title>
        <SubTitle>ElderCare 서비스에 로그인하세요!</SubTitle>
        <form onSubmit={handleSubmit}>
          <InputGroup>
            <InputTitle>ID</InputTitle>
            <Input type="text" />
          </InputGroup>
          <InputGroup>
            <InputTitle>비밀번호</InputTitle>
            <Input type="password" />
          </InputGroup>
          <Options>
            <CheckboxWrapper>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              <span>로그인 상태 유지</span>
            </CheckboxWrapper>
            <StyledLink href="/find-password">비밀번호 찾기</StyledLink>
          </Options>
          <SubmitButton type="submit" value="로그인" />
        </form>
        <SignUpPrompt>
          계정이 없으신가요? <StyledLink href="/sign-up">회원가입</StyledLink>
        </SignUpPrompt>
      </LoginWrapper>
    </LoginContainer>
  );
};

const LoginContainer = styled.div`
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

const LoginWrapper = styled.div`
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

const Options = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 15px 0;
`;

const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;

  input {
    accent-color: #000;
  }
  span {
    margin-left: 8px;
  }
`;

const StyledLink = styled.a`
  font-weight: bold;
  text-decoration: underline;
  color: #000;
  text-decoration: underline;

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
  cursor: pointer;

  &:hover {
    border: 1px solid #999;
    background-color: #fff;
    color: #000;
    transition: 0.2s ease-in;
  }
`;

const SignUpPrompt = styled.p`
  margin-top: 20px;
`;

export default LoginForm;
