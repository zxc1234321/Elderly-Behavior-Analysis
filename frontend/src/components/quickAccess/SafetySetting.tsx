import React from 'react';
import styled from 'styled-components';
import { Button } from '@mui/material';
import useSecuritySettingsStore from '@/store/useSafetySettingsPasswordStore';

const SafetySetting: React.FC = () => {
  const {
    currentPassword,
    newPassword,
    confirmPassword,
    setCurrentPassword,
    setNewPassword,
    setConfirmPassword,
  } = useSecuritySettingsStore();

  const handlePasswordChange = () => {
    // 서버에 비밀번호 변경 요청을 보내는 로직을 여기에 추가할 수 있음
    console.log({
      currentPassword,
      newPassword,
      confirmPassword,
    });
  };

  return (
    <Container>
      <Title>보안 설정</Title>
      <Description>계정 보안을 관리하세요</Description>
      
      <InputGroup>
        <InputLabel>현재 비밀번호</InputLabel>
        <StyledInput
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
      </InputGroup>
      
      <InputGroup>
        <InputLabel>새 비밀번호</InputLabel>
        <StyledInput
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </InputGroup>
      
      <InputGroup>
        <InputLabel>새 비밀번호 확인</InputLabel>
        <StyledInput
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </InputGroup>
      
      <SaveButton variant="contained" onClick={handlePasswordChange}>
        비밀번호 변경
      </SaveButton>
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


const SaveButton = styled(Button)`
  && {
    background-color: #000;
    color: #fff;
    font-size: 14px;
    margin-top: 15px;
    &:hover {
      background-color: #333;
    }
  }
`;

export default SafetySetting;
