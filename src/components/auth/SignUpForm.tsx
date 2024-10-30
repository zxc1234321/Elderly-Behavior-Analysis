import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const SignUpForm = () => {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate('/email-auth');
  };

  return (
    <SignUpContainer>
      <SignUpWrapper>
        <Title>회원가입</Title>
        <form onSubmit={handleSubmit}>
          <InputGroup>
            <InputTitle>이름</InputTitle>
            <Input type="text" />
          </InputGroup>
          <InputGroup>
            <InputTitle>이메일</InputTitle>
            <Input type="email" />
          </InputGroup>
          <InputGroup>
            <InputTitle>비밀번호</InputTitle>
            <Input type="password" placeholder="대문자, 소문자, 숫자, 특수기호를 포함하여 8~15자입니다." />
          </InputGroup>
          <InputGroup>
            <InputTitle>비밀번호 확인</InputTitle>
            <Input type="password" />
          </InputGroup>
          <SubmitButton type="submit" value="가입하기" />
        </form>
        <LoginPrompt>
          이미 계정이 있으신가요?
          <StyledLink href="/logIn">로그인</StyledLink>
        </LoginPrompt>
      </SignUpWrapper>
    </SignUpContainer>
  );
};

const SignUpContainer = styled.div`
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

const SignUpWrapper = styled.div`
  max-width: 450px;
  width: 100%;
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
    width: 95%;

    &::placeholder {
      font-size: 12px; /* placeholder 글자 크기 조정 */
    }
  }

  &::placeholder {
    color: #999;
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

const LoginPrompt = styled.p`
  margin-top: 20px;
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
    border: 1px solid #999;
    background-color: #fff;
    color: #000;
    transition: 0.2s ease-in;
  }
`;

export default SignUpForm;