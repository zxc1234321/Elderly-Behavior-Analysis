import styled from 'styled-components';
import { Link } from 'react-router-dom';

interface QuickAccessButtonProps {
  title: string;
  link: string;
}

const QuickAccessButton = ({ title, link }: QuickAccessButtonProps) => {
  return (
    <StyledLink to={link}>
      <Button>{title}</Button>
    </StyledLink>
  );
};

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const Button = styled.button`
  background-color: #e0e0e0;
  padding: 24px 40px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-family: 'LINESeedKR-Bd', sans-serif;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ccc;
  }
`;

export default QuickAccessButton;
