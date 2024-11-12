import { create } from 'zustand';

interface SafetySettingsState {
  fallDetection: boolean;
  inactivityAlert: boolean;
  emergencyContact: string;
  safeZoneRadius: string;
  setFallDetection: (value: boolean) => void;
  setInactivityAlert: (value: boolean) => void;
  setEmergencyContact: (value: string) => void;
  setSafeZoneRadius: (value: string) => void;
}

const useSafetySettingsStore = create<SafetySettingsState>((set) => ({
  fallDetection: false,
  inactivityAlert: false,
  emergencyContact: '010-1234-5678',
  safeZoneRadius: '100',
  setFallDetection: (value) => set({ fallDetection: value }),
  setInactivityAlert: (value) => set({ inactivityAlert: value }),
  setEmergencyContact: (value) => set({ emergencyContact: value }),
  setSafeZoneRadius: (value) => set({ safeZoneRadius: value }),
}));

export default useSafetySettingsStore;
