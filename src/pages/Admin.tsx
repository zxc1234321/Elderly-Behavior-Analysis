import styled from 'styled-components';
import AdminHeader from '@/components/container/AdminHeader';
import QuickAccessButton from '@/components/admin/QuickAccessButton';
import StatusCard from '@/components/admin/StatusCard';
import RecentActivity from '@/components/admin/RecentActivity';
import NotificationCard from '@/components/admin/NotificationCard';

interface AdminProps {
  username: string;
}

const Admin = ({ username }: AdminProps) => {
  return (
    <>
      <AdminHeader />
      <Container>
        <Title>안녕하세요! {username}님!</Title>
        <SectionWrapper>
          <StatusSection>
            <StatusCard status="위험" />
          </StatusSection>
          <StatusSection>
            <RecentActivity />
          </StatusSection>
          <StatusSection>
            <NotificationCard />
          </StatusSection>
        </SectionWrapper>
        <Title>빠른 액세스</Title>
        <QuickAccessWrapper>
          <QuickAccessButton title="활동로그" link="/activity-log" />
          <QuickAccessButton title="건강보고서" link="/health-report" />
          <QuickAccessButton title="안전 설정" link="/safety-settings" />
          <QuickAccessButton title="설정" link="/settings" />
        </QuickAccessWrapper>
      </Container>
    </>
  );
};

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  padding-top: 60px;
`;

const Title = styled.h1`
  margin-bottom: 30px;
  font-size: 24px;
  font-weight: bold;
`;

const SectionWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 50px;
  flex-wrap: wrap;
`;

const StatusSection = styled.div`
  flex: 1;
  min-width: 300px;
  max-width: 350px;
`;

const QuickAccessWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
  gap: 20px;
  flex-wrap: wrap;
`;

export default Admin;
