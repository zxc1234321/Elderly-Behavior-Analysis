import styled from 'styled-components';

interface Notification {
  message: string;
}

const NotificationCard = () => {
  const notifications: Notification[] = [];

  return (
    <Card>
      <Title>알림</Title>
      <Subtitle>최근 알림사항입니다.</Subtitle>
      {notifications.length === 0 ? (
        <EmptyMessage>알림 기록이 없습니다.</EmptyMessage>
      ) : (
        <NotificationList>
          {notifications.map((notification, index) => (
            <NotificationItem key={index}>{notification.message}</NotificationItem>
          ))}
        </NotificationList>
      )}
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

const EmptyMessage = styled.p`
  font-size: 14px;
  color: #999;
`;

const NotificationList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const NotificationItem = styled.li`
  font-size: 14px;
  color: #555;
  padding: 10px 0;
  border-bottom: 1px solid #ddd;

  &:last-child {
    border-bottom: none;
  }
`;

export default NotificationCard;
