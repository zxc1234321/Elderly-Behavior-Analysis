import React from 'react';
import styled from 'styled-components';
import { Switch } from '@mui/material';

const AlarmSetting: React.FC = () => {
  return (
    <Container>
      <Title>알림 설정</Title>
      <Description>알림 기본 설정을 관리하세요.</Description>
      <SettingItem>
        <LabelWrapper>
          <SettingLabel>이메일 알림</SettingLabel>
          <SettingDescription>중요 알림을 이메일로 받습니다.</SettingDescription>
        </LabelWrapper>
        <CustomSwitch defaultChecked />
      </SettingItem>
      <SettingItem>
        <LabelWrapper>
          <SettingLabel>푸시 알림</SettingLabel>
          <SettingDescription>모바일 기기로 푸시 알림을 받습니다.</SettingDescription>
        </LabelWrapper>
        <CustomSwitch />
      </SettingItem>
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

const SettingItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
`;

const LabelWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-right: 10px;
  align-items: start;
`;

const SettingLabel = styled.p`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 4px;
`;

const SettingDescription = styled.p`
  font-size: 12px;
  color: #777;
`;

const CustomSwitch = styled(Switch)`
  && {
    width: 42px;
    height: 26px;
    padding: 0;
    .MuiSwitch-switchBase {
      padding: 2px;
      &.Mui-checked {
        transform: translateX(16px);
        color: #fff;
        + .MuiSwitch-track {
          background-color: #000;
          opacity: 1;
        }
      }
    }
    .MuiSwitch-thumb {
      width: 22px;
      height: 22px;
    }
    .MuiSwitch-track {
      border-radius: 13px;
      background-color: #ccc;
      opacity: 1;
    }
  }
`;

export default AlarmSetting;
