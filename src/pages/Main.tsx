import styled, { keyframes } from 'styled-components';
import '@/assets/style/global.css';

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Main = () => {
  return (
    <MainContainer>
      <TitleWrapper>
        <p>ElderCare</p>
      </TitleWrapper>
      <CommentWrapper>
        <MainComment style={{ animationDelay: '0.2s' }}>노년층 부모님의 안전과 건강을 위한 스마트한 솔루션</MainComment>
        <MainComment style={{ animationDelay: '0.4s' }}>행동 분석을 통해 자녀분들에게 실시간 정보와 안심을 제공합니다</MainComment>
      </CommentWrapper>
      <ButtonWrapper>
        <StartButton href="/login" style={{ animationDelay: '0.6s' }}>시작하기</StartButton>
        <MoreButton href="/information" style={{ animationDelay: '0.8s' }}>자세히 알아보기</MoreButton>
      </ButtonWrapper>
    </MainContainer>
  );
};

const MainContainer = styled.div`
  text-align: center;
  opacity: 0;
  animation: ${fadeInUp} 1s ease forwards;
  animation-delay: 0.1s;
  padding: 20px;
  position: relative;

  @media (max-width: 768px) {
    padding: 10px;
  }

  @media (max-width: 480px) {
    height: 97vh;
  }
`;

const TitleWrapper = styled.div`
  p {
    font-size: 92px;
    font-weight: bold;
    margin: 280px 0 50px 0;
    opacity: 0;
    animation: ${fadeInUp} 1s ease forwards;
    animation-delay: 0.1s;

    @media (max-width: 768px) {
      font-size: 48px;
      margin: 100px 0;
    }

    @media (max-width: 480px) {
      font-size: 50px;
      margin: 290px 0 50px 0;
    }
  }
`;

const CommentWrapper = styled.div`
  @media (max-width: 480px) {
    margin: 60px 0;
  }
`;

const MainComment = styled.p`
  font-size: 24px;
  font-weight: bold;
  margin-top: 10px;
  margin-bottom: 0;
  opacity: 0;
  animation: ${fadeInUp} 1s ease forwards;

  @media (max-width: 768px) {
    font-size: 16px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

const ButtonWrapper = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: center;
  gap: 20px;

  @media (max-width: 480px) {
    position: absolute;
    bottom: 70px;
    left: 50%;
    transform: translateX(-50%);
    width: 94%;
    flex-direction: column;
    gap: 16px;
  }
`;

const StartButton = styled.a`
  display: inline-block;
  max-width: 140px;
  width: 100%;
  height: 42px;
  line-height: 42px;
  font-size: 16px;
  text-align: center;
  border-radius: 5px;
  background-color: #000;
  color: #fff;
  text-decoration: none;
  opacity: 0;
  animation: ${fadeInUp} 1s ease forwards;

  &:hover {
    border: 1px solid #999;
    background-color: #f9f9f9;
    color: #000;
    transition: 0.2s ease-in;
    font-weight: bold;
  }

  @media (max-width: 768px) {
    max-width: 100px;
    height: 50px;
  }

  @media (max-width: 480px) {
    max-width: 100%;
    height: 42px;
  }
`;

const MoreButton = styled.a`
  display: inline-block;
  max-width: 230px;
  width: 100%;
  height: 42px;
  line-height: 42px;
  font-size: 16px;
  text-align: center;
  border: 1px solid #999;
  border-radius: 5px;
  background-color: #f9f9f9;
  color: #000;
  text-decoration: none;
  opacity: 0;
  animation: ${fadeInUp} 1s ease forwards;

  &:hover {
    background-color: #000;
    color: #f9f9f9;
    transition: 0.2s ease-out;
    font-weight: bold;
  }

  @media (max-width: 768px) {
    max-width: 180px;
    height: 50px;
  }

  @media (max-width: 480px) {
    max-width: 100%;
    height: 42px;
  }
`;

export default Main;
