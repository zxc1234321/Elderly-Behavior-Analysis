import { create } from 'zustand';

interface SecuritySettingsState {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  setCurrentPassword: (value: string) => void;
  setNewPassword: (value: string) => void;
  setConfirmPassword: (value: string) => void;
}

const useSafetySettingsPasswordStore = create<SecuritySettingsState>((set) => ({
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
  setCurrentPassword: (value) => set({ currentPassword: value }),
  setNewPassword: (value) => set({ newPassword: value }),
  setConfirmPassword: (value) => set({ confirmPassword: value }),
}));

export default useSafetySettingsPasswordStore;
