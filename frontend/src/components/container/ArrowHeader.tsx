import styled from 'styled-components';
import backArrow from '@/assets/images/back-arrow.svg';

const ArrowHeader = () => {
  return (
    <HeaderContainer>
      <Title>
        <a href="/admin">
          <BackArrowIcon src={backArrow} alt="Back Arrow" />
        </a>
      </Title>
      <NavLinks>
        <a href="/#">알림정보</a>
        <a href="/#">사용자 정보</a>
        <a href="/#">로그아웃</a>
      </NavLinks>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  position: relative;

  &:before {
    content: '';
    position: absolute;
    top: 80px;
    bottom: 0;
    left: 10px;
    right: 10px;
    height: 1px;
    background-color: #000;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    text-align: center;
  }
`;

const Title = styled.p`
  margin-bottom: 14px;
  font-size: 32px;
  font-weight: bold;

  a {
    text-decoration: none;
    color: #000;
  }
`;

const BackArrowIcon = styled.img`
    padding-bottom: 18px;
  width: 32px;
  height: 24px;
  vertical-align: middle;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 20px;

  a {
    text-decoration: none;
    color: #000;
    font-weight: normal;
    transition: transform 0.3s ease, font-weight 0.3s ease;

    &:hover {
      transform: translateY(-2px);
      font-weight: bold;
    }
  }
`;

export default ArrowHeader;
