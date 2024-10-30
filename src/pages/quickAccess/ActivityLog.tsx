import styled from 'styled-components';
import ArrowHeader from '@/components/container/ArrowHeader';
import LogContainer from '@/components/quickAccess/LogContainer';

const ActivityLog: React.FC = () => {
  return (
    <PageContainer>
      <HeaderWrapper>
        <ArrowHeader />
      </HeaderWrapper>
      <ContentWrapper>
        <LogContainer />
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
  align-items: center;
  justify-content: center;
  flex: 1;
`;

export default ActivityLog;
