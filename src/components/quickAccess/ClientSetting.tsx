import React from 'react';
import styled from 'styled-components';

const ClientSetting: React.FC = () => {
  return (
    <Container>
      <Title>계정 설정</Title>
      <Description>개인 정보를 관리하세요</Description>
      <InputGroup>
        <InputLabel>이름</InputLabel>
        <StyledInput type="text" defaultValue="홍길동" />
      </InputGroup>
      <InputGroup>
        <InputLabel>이메일</InputLabel>
        <StyledInput type="email" defaultValue="example@example.com" />
      </InputGroup>
      <InputGroup>
        <InputLabel>전화번호</InputLabel>
        <StyledInput type="text" defaultValue="010-1234-5678" />
      </InputGroup>
    </Container>
  );
};

const Container = styled.div`
  max-width: 400px;
  width: 100%;
  margin: 20px auto;
  padding: 30px;
  background-color: #e0e0e0;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const Description = styled.p`
  font-size: 14px;
  color: #555;
  margin-bottom: 20px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 15px;
`;

const InputLabel = styled.p`
  font-size: 14px;
  margin-bottom: 6px;
`;

const StyledInput = styled.input`
  width: calc(100% - 16px); /* Container 패딩을 고려한 너비 조정 */
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #f9f9f9;
  &:focus {
    outline: none;
    border-color: #999;
  }
`;


export default ClientSetting;
