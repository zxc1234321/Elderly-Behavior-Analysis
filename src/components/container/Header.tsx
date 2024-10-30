import styled from 'styled-components';

const Header = () => {
  return (
    <HeaderContainer>
      <Title>
        <a href="/">ElderCare</a>
      </Title>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
  padding: 0 20px;
  position: relative;

  &:before {
    content: '';
    position: absolute;
    top: 48px;
    bottom: 0;
    left: 10px;
    right: 10px;
    height: 1px;
    background-color: #000;
  }

  @media (max-width: 480px) {
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
`

export default Header;