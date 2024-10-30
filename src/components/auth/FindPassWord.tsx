import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const FindPassWord = () => {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate('/newPassword');
  };

  return (
    <Container>
      <Wrapper>
        <Title>비밀번호 찾기</Title>
        <SubTitle>비밀번호 재설정 링크를 받을 이메일 주소를 입력하세요.</SubTitle>
        <form onSubmit={handleSubmit}>
          <InputGroup>
            <InputTitle>이메일</InputTitle>
            <Input type="email" />
          </InputGroup>
          <SubmitButton type="submit" value="비밀번호 재설정 링크 전송" />
        </form>
        <SignUpPrompt>
          <StyledLink href="/logIn">로그인 페이지로 돌아가기</StyledLink>
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
  margin-top: 40px;
  cursor: pointer;

  &:hover {
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

export default FindPassWord;
