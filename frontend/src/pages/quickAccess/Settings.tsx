import React from 'react';
import ArrowHeader from '@/components/container/ArrowHeader';
import ClientSetting from '@/components/quickAccess/ClientSetting';
import SafetySetting from '@/components/quickAccess/SafetySetting';
import AlarmSetting from '@/components/quickAccess/AlarmSetting';
import styled from 'styled-components';
import useSettingsStore from '@/store/useSettingsStore';

const Settings: React.FC = () => {
    const { clientData, safetyData, alarmData, setClientData, setSafetyData, setAlarmData } = useSettingsStore();

    const handleSubmit = async () => {
        const settingsData = {
            clientData,
            safetyData,
            alarmData
        };

        try {
            const response = await fetch('/api/settings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(settingsData)
            });

            if (response.ok) {
                console.log("데이터 전송 성공");
            } else {
                console.log("데이터 전송 실패");
            }
        } catch (error) {
            console.error("에러 발생:", error);
        }
    };

    return (
        <PageContainer>
            <HeaderWrapper>
                <ArrowHeader />
            </HeaderWrapper>
            <ContentWrapper>
                <ClientSetting data={clientData} setData={setClientData} />
                <SafetySetting data={safetyData} setData={setSafetyData} />
                <AlarmSetting data={alarmData} setData={setAlarmData} />
                <SubmitButton onClick={handleSubmit}>설정 저장</SubmitButton>
            </ContentWrapper>
        </PageContainer>
    );
};

// 스타일링
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
`;

const HeaderWrapper = styled.div`
  width: 100%;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 500px;
  gap: 20px;
  padding: 20px;
  box-sizing: border-box;
`;

const SubmitButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
  color: white;
  background-color: black;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #333;
  }
`;

export default Settings;
