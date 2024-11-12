import styled from 'styled-components';

interface ActivityCardProps {
  number: number;
  progress: number;
}

const ActivityCard = ({ number, progress }: ActivityCardProps) => {
  return (
    <Card>
      <Title>활동 횟수</Title>
      <Number>{number}회</Number>
      <ProgressText>하루 평균 횟수의 {progress}% 달성</ProgressText>
    </Card>
  );
};

const Card = styled.div`
  background-color: #d9d9d9;
  padding: 20px;
  border-radius: 15px;
  flex: 1;
  min-width: 300px;
  max-width: 350px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 35px; /* 간격을 더 넓게 설정 */
`;

const Number = styled.p`
  font-size: 16px;
  color: #000;
  margin-bottom: 5px;
`;

const ProgressText = styled.p`
  font-size: 14px;
  color: #555;
`;

export default ActivityCard;
