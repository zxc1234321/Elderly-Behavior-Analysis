import React from 'react';
import styled from 'styled-components';
import { Switch, Button } from '@mui/material';
import useSafetySettingsStore from '@/store/useSafetySettingsStore';

const SafetyContainer = () => {
  const {
    fallDetection,
    inactivityAlert,
    emergencyContact,
    safeZoneRadius,
    setFallDetection,
    setInactivityAlert,
    setEmergencyContact,
    setSafeZoneRadius,
  } = useSafetySettingsStore();

  return (
    <Container>
      <Title>안전 알림 설정</Title>
      <Description>안전 관련 알림을 설정하세요.</Description>
      
      <SettingItem>
        <LabelWrapper>
          <SettingLabel>낙상 감지</SettingLabel>
          <SettingDescription>낙상이 감지되면 즉시 알림을 받습니다.</SettingDescription>
        </LabelWrapper>
        <CustomSwitch
          checked={fallDetection}
          onChange={(e) => setFallDetection(e.target.checked)}
        />
      </SettingItem>
      
      <SettingItem>
        <LabelWrapper>
          <SettingLabel>정시간 무활동 알림</SettingLabel>
          <SettingDescription>일정 시간 동안 활동이 없으면 알림을 받습니다.</SettingDescription>
        </LabelWrapper>
        <CustomSwitch
          checked={inactivityAlert}
          onChange={(e) => setInactivityAlert(e.target.checked)}
        />
      </SettingItem>

      <InputGroup>
        <InputLabel>비상 연락처</InputLabel>
        <StyledInput
          type="text"
          value={emergencyContact}
          onChange={(e) => setEmergencyContact(e.target.value)}
        />
      </InputGroup>

      <InputGroup>
        <InputLabel>안전 구역 설정 (반경 m)</InputLabel>
        <StyledInput
          type="text"
          value={safeZoneRadius}
          onChange={(e) => setSafeZoneRadius(e.target.value)}
        />
      </InputGroup>

      <SaveButton
        variant="contained"
        onClick={() => {
            console.log({
            fallDetection,
            inactivityAlert,
            emergencyContact,
            safeZoneRadius,
            });
        }}
        >
            안전 설정 저장
        </SaveButton>
    </Container>
  );
};

const Container = styled.div`
  max-width: 500px;
  width: 100%;
  margin: 0 auto;
  padding: 30px;
  background-color: #e0e0e0;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
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

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  margin-top: 15px;
`;

const InputLabel = styled.p`
  text-align: left;
  font-size: 14px;
  margin-bottom: 6px;
`;

const StyledInput = styled.input`
  width: calc(100% - 20px);
  height: 20px;
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
  width: 100%;
  && {
    margin-top: 25px;
    background-color: #000;
    color: #fff;
    font-size: 14px;
    padding: 10px 0;
    &:hover {
      background-color: #333;
    }
  }
`;

export default SafetyContainer;
