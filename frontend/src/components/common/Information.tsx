import React from 'react';
import styled from 'styled-components';
import Accordion from '@/components/container/Accordian';

const Information = () => {
  return (
    <Container>
      <IntroSection>
        <IntroTitle>ElderCare 서비스 소개</IntroTitle>
        <IntroDetail>
          노년층 부모님의 안전과 건강을 위한 스마트한 솔루션
          <br />
          행동 분석을 통해 자녀분들에게 실시간 정보와 안심을 제공합니다.
        </IntroDetail>
      </IntroSection>
      <FeatureSection>
        <FeatureTitle>주요 기능</FeatureTitle>
        <FeatureWrapper>
          <FeatureCard>
            <h3>안전관리</h3>
            <p>
              낙상감지, 응급 상황 알림 등
              <br />
              부모님의 안전을 24시간 지켜드립니다.
            </p>
          </FeatureCard>
          <FeatureCard>
            <h3>생활 패턴 분석</h3>
            <p>
              일상 생활을 분석하여 생활 패턴의 변화를 감지하고
              <br />
              문제가 발생했을 때 대체 가능합니다.
            </p>
          </FeatureCard>
        </FeatureWrapper>
      </FeatureSection>
      <FAQSection>
        <FAQTitle>자주 묻는 질문</FAQTitle>
        <Accordion />
      </FAQSection>
      <CallToActionSection>
        <CTASTitle>지금 바로 시작하세요!</CTASTitle>
        <CTASDetail>
          ElderCare와 함께 부모님의 건강하고 안전한 삶을 지원하세요!
        </CTASDetail>
        <ButtonWrapper>
          <a href="/login">시작하기</a>
          <a href="#">문의하기</a>
        </ButtonWrapper>
      </CallToActionSection>
    </Container>
  );
};

// 스타일링
const Container = styled.div`
  background-color: #f9f9f9;
`;

const IntroSection = styled.div`
  margin-bottom: 20px;
  text-align: center;
`;

const IntroTitle = styled.p`
    font-size: 62px;
    margin-bottom: 4px;
`

const IntroDetail = styled.p`
    font-size: 20px;
    padding-bottom: 20px;
`

const FeatureSection = styled.div`
    padding: 60px;
    margin-bottom: 20px;
    background-color: #999;
`;

const FeatureTitle = styled.p`
    margin-top: 0;
    font-size: 62px;
    text-align: center;
`

const FeatureWrapper = styled.div`
    display: flex;
    justify-content: center;
  gap: 20px; /* 카드 사이 간격 */
`;

const FeatureCard = styled.div`
  background-color: #e0e0e0; /* 카드 배경색 */
    padding: 20px;
    border-radius: 10px;
    width: 300px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

    h3 {
        font-size: 24px;
        font-weight: bold;
        margin-bottom: 10px;
    }

    p {
        margin-top: 50px;
        margin-bottom: 0;
        font-size: 14px;
        color: #333;
    }
`;

const FAQSection = styled.div`
    margin-bottom: 20px;
`;

const FAQTitle = styled.p`
    font-size: 62px;
    margin-bottom: 4px;
    text-align: center;
`

const CallToActionSection = styled.div`
    padding: 20px;
    padding-bottom: 60px;
    text-align: center;
    background-color: #000;
    color: #fff;
`;

const CTASTitle = styled.p`
    margin-bottom: 0;
    font-size: 62px;
`

const CTASDetail = styled.p`
    font-size: 24px;
`

const ButtonWrapper = styled.div`
  margin-top: 10px;

  a {
    margin-right: 10px;
    text-decoration: none;
    color: white;
    background-color: #999;
    padding: 10px 20px;
    border-radius: 5px;
    transition: background-color 0.3s;

    &:hover {
      background-color: #f9f9f9;
      color: #000;
    }
  }
`;

export default Information;
