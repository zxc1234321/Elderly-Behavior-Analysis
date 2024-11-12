import { useState } from 'react';
import styled from 'styled-components';

interface AccordionItemProps {
  question: string;
  answer: React.ReactNode;
}

const Accordion = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const items: AccordionItemProps[] = [
    {
      question: 'ElderCare는 어떤 서비스인가요?',
      answer: (
        <>
          ElderCare는 노년층 부모님의 건강과 안전을 관리하는 스마트 솔루션입니다.
          <br />
          실시간 모니터링, 행동 분석, 응급 상황 감지 등의 기능을 통해 자녀분들에게 부모님의 상태에 대한 정보와 안심을 제공합니다.
        </>
      ),
    },
    {
      question: '개인정보는 안전한가요?',
      answer: (
        <>
          네, 개인정보 보호는 저희의 최우선 과제입니다. 최신 암호화 기술을 사용하여 모든 데이터를 안전하게 보호하며, 엄격한 개인정보 보호 정책을 준수합니다.
        </>
      ),
    },
    {
      question: '어떤 기기가 필요한가요?',
      answer: (
        <>
          ElderCare 서비스를 이용하기 위해서는 스마트폰과 센서 기기만 있으면 됩니다. 자세한 기기 요구 사항은 가입 시 안내 해 드립니다.
        </>
      ),
    },
  ];

  return (
    <AccordionContainer>
      {items.map((item, index) => (
        <AccordionItem key={index}>
          <AccordionTrigger onClick={() => handleToggle(index)}>
            {item.question}
          </AccordionTrigger>
          <Line />
          <AccordionContent isOpen={openIndex === index}>
            <AccordionContentInner>{item.answer}</AccordionContentInner>
          </AccordionContent>
        </AccordionItem>
      ))}
    </AccordionContainer>
  );
};

// 스타일링
const AccordionContainer = styled.div`
padding: 0 150px;
  margin-top: 10px;
  text-align: start;
`;

const AccordionItem = styled.div`
  margin-bottom: 10px;
`;

const AccordionTrigger = styled.p`
  cursor: pointer;
  font-size: 24px;
  font-weight: bold;
  margin: 0;
  padding: 10px 0;

  &:hover {
    color: #999;
  }
`;

const Line = styled.hr`
  border: none;
  border-top: 1px solid #ddd;
  margin: 0;
`;

interface AccordionContentProps {
  isOpen: boolean;
}

const AccordionContent = styled.div<AccordionContentProps>`
  max-height: ${({ isOpen }) => (isOpen ? '500px' : '0')}; /* 최대 높이 설정 */
  overflow: hidden; /* 숨겨진 영역 감추기 */
  transition: max-height 0.4s ease-in-out; /* 애니메이션 효과 */
`;

const AccordionContentInner = styled.div`
  padding: 10px 0;
  color: #555;
`;

export default Accordion;
