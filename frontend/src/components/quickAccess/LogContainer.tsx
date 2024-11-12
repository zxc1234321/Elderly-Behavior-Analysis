import styled from 'styled-components';

const LogContainer = () => {
    // 임의 데이터라능
  const logs = [
    { time: '오전 9시', activity: '운동', details: '30분 동안 조깅' },
    { time: '오전 12시', activity: '점심식사', details: '채식 식단' },
    { time: '오후 3시', activity: '오후 산책', details: '15분 동안 공원 산책' },
  ];

  return (
    <ActivityLogContainer>
      <Title>오늘의 활동 로그</Title>
      <LogWrapper>
        <LogHeader>
          <HeaderItem>시간</HeaderItem>
          <HeaderItem>활동</HeaderItem>
          <HeaderItem>상세정보</HeaderItem>
        </LogHeader>
        {logs.map((log, index) => (
          <LogInformation key={index}>
            <LogItem>{log.time}</LogItem>
            <LogItem>{log.activity}</LogItem>
            <LogItem>{log.details}</LogItem>
          </LogInformation>
        ))}
      </LogWrapper>
    </ActivityLogContainer>
  );
};

const ActivityLogContainer = styled.div`
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
  padding: 20px;
  background-color: #d9d9d9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.p`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
`;

const LogWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const LogHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  font-weight: bold;
  border-bottom: 1px solid #000;
`;

const HeaderItem = styled.div`
  flex: 1;
  text-align: center;
  font-size: 16px;
  color: #000;
`;

const LogInformation = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #999;

  &:last-child {
    border-bottom: none;
  }
`;

const LogItem = styled.div`
  flex: 1;
  text-align: center;
  font-size: 14px;
  color: #333;
`;

export default LogContainer;
