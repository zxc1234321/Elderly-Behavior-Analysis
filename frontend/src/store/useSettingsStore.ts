// src/store/useSettingsStore.ts
import { create } from 'zustand';

interface ClientData {
  name: string;
  email: string;
  phone: string;
}

interface SafetyData {
  emergencyContact: string;
  safeZoneRadius: string;
}

interface AlarmData {
  emailAlert: boolean;
  pushAlert: boolean;
}

interface SettingsStore {
  clientData: ClientData;
  safetyData: SafetyData;
  alarmData: AlarmData;
  setClientData: (data: ClientData) => void;
  setSafetyData: (data: SafetyData) => void;
  setAlarmData: (data: AlarmData) => void;
}

const useSettingsStore = create<SettingsStore>((set) => ({
  clientData: { name: '', email: '', phone: '' },
  safetyData: { emergencyContact: '', safeZoneRadius: '' },
  alarmData: { emailAlert: false, pushAlert: false },
  setClientData: (data: ClientData) => set({ clientData: data }),
  setSafetyData: (data: SafetyData) => set({ safetyData: data }),
  setAlarmData: (data: AlarmData) => set({ alarmData: data }),
}));

export default useSettingsStore;
