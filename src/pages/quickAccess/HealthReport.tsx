import styled from 'styled-components';
import ArrowHeader from '@/components/container/ArrowHeader';
import ActivityCard from '@/components/quickAccess/ActivityCard';
import SleepCard from '@/components/quickAccess/SleepCard';

const HealthReport: React.FC = () => {
  return (
    <PageContainer>
      <HeaderWrapper>
        <ArrowHeader />
      </HeaderWrapper>
      <ContentWrapper>
        <SleepCard number={7} />
        <ActivityCard number={5} progress={80} />
      </ContentWrapper>
    </PageContainer>
  );
};

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const HeaderWrapper = styled.div`
  flex-shrink: 0;
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export default HealthReport;
