import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Email = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const email = (e.target as HTMLFormElement).email.value;
      await axios.post('http://localhost:3000/auth/send-email-verification', { email });
      navigate('/email-update'); // 성공 시 페이지 이동
    } catch (error) {
      console.error('이메일 인증 요청 실패:', error);
    }
  };

  return (
    <Container>
      <Wrapper>
        <Title>이메일 인증하기</Title>
        <SubTitle>이메일 인증을 완료하고 본인인증을 완료하세요.</SubTitle>
        <form onSubmit={handleSubmit}>
          <InputGroup>
            <InputTitle>이메일</InputTitle>
            <Input type="email" name="email" required />
          </InputGroup>
          <SubmitButton type="submit" value="다음으로" />
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


export default Email;