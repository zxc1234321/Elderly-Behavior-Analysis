import { useState } from 'react';
import { useAuthStore } from '@/store/auth/authStore';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 유효성 검사: 이메일과 비밀번호가 비어있는지 확인
    if (!email || !password) {
      alert('이메일과 비밀번호를 입력해주세요.');
      return;
    }

    try {
      // 로그인 API 요청
      const response = await axios.post('http://127.0.0.1:3000/auth/signin', {
        email,
        password,
      });

      // 서버에서 토큰을 받아와 로그인 처리
      const { token } = response.data;
      await login(token);  // 토큰을 스토어에 저장 후 navigate 실행

      console.log('로그인 성공:', response.data);

      // 로그인 성공 시 /admin으로 이동
      navigate('/admin');
    } catch (error) {
      console.error('로그인 실패:', error);
      alert('로그인에 실패했습니다. 아이디와 비밀번호를 확인하세요.');
    }
  };

  return (
    <LoginContainer>
      <LoginWrapper>
        <Title>로그인</Title>
        <SubTitle>ElderCare 서비스에 로그인하세요!</SubTitle>
        <form onSubmit={handleSubmit}>
          <InputGroup>
            <InputTitle>ID</InputTitle>
            <Input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </InputGroup>
          <InputGroup>
            <InputTitle>비밀번호</InputTitle>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
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
