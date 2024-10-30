import styled from 'styled-components';

const AdminHeader = () => {
  return (
    <HeaderContainer>
      <Title>
        <a href="/">ElderCare</a>
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
  align-items: center; /* 수직으로 중앙 정렬 */
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
    flex-direction: column; /* 모바일 화면에서는 세로로 배치 */
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

export default AdminHeader;
