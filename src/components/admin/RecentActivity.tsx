import styled from 'styled-components';

interface Activity {
  time: string;
  activity: string;
}

const RecentActivity = () => {
  // 임의의 활동 데이터를 정의합니다.
  const activities: Activity[] = [
    { time: '오전 9시', activity: '운동' },
    { time: '오전 12시', activity: '점심식사' },
    { time: '오후 3시', activity: '오후 산책' },
    { time: '오후 6시', activity: '저녁식사' },
    { time: '오후 9시', activity: '독서' }
  ];

  return (
    <Card>
      <Title>최근활동</Title>
      <Subtitle>오늘의 주요활동입니다.</Subtitle>
      <ActivityList>
        {activities.slice(0, 3).map((item, index) => (
          <ActivityItem key={index}>
            <Time>{item.time}</Time>
            <Activity>{item.activity}</Activity>
          </ActivityItem>
        ))}
      </ActivityList>
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

const Title = styled.h1`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const Subtitle = styled.p`
  font-size: 16px;
  color: #666;
  margin-bottom: 20px;
`;

const ActivityList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ActivityItem = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
  &:last-child {
    border-bottom: none;
  }
`;

const Time = styled.span`
  font-weight: bold;
  font-size: 14px;
  color: #333;
`;

const Activity = styled.span`
  font-size: 14px;
  color: #555;
`;

export default RecentActivity;
