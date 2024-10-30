import styled from 'styled-components';

interface ActivityCardProps {
  number: number;
}

const SleepCard = ({ number }: ActivityCardProps) => {
  const sleepProgress = 
    number <= 5 
      ? '수면부족입니다. 충분한 수면시간이 필요합니다.' 
      : number >= 6 && number <= 7.5 
      ? '적당한 수면입니다.' 
      : '충분한 수면을 취하셨습니다.';

  return (
    <Card>
      <Title>수면 시간</Title>
      <Number>{number}시간</Number>
      <ProgressText>{sleepProgress}</ProgressText>
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

export default SleepCard;
