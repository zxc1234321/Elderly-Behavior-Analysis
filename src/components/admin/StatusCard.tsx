import styled from 'styled-components';

interface StatusCardProps {
  status: '정상' | '경고' | '위험';
}

const getStatusColor = (status: string): { color: string } => {
  switch (status) {
    case '정상':
      return { color: '#00FF00' };
    case '경고':
      return { color: '#0000FF' };
    case '위험':
      return { color: '#FF0000' };
    default:
      return { color: '#999999' };
  }
};

const StatusCard = ({ status }: StatusCardProps) => {
  const { color } = getStatusColor(status);

  return (
    <Card>
      <Title>현재 상태</Title>
      <Description>홍부모님의 현재 상태입니다.</Description>
      <StatusWrapper>
        <StatusText>{status}</StatusText>
        <StatusCircle color={color} />
      </StatusWrapper>
    </Card>
  );
};

const Card = styled.div`
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 15px;
  flex: 1;
  min-width: 300px;
  max-width: 350px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.p`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const Description = styled.p`
  font-size: 16px;
  color: #666;
  margin-bottom: 20px;
  margin-top: 0;
`;

const StatusWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: right;
  gap: 10px;
`;

const StatusText = styled.p`
  font-size: 18px;
  font-weight: bold;
  color: #333;
`;

const StatusCircle = styled.div<{ color: string }>`
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

export default StatusCard;
