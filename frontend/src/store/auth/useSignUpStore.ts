// src/store/useSignUpStore.ts
import { create } from 'zustand';

interface SignUpState {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  setName: (value: string) => void;
  setEmail: (value: string) => void;
  setPassword: (value: string) => void;
  setConfirmPassword: (value: string) => void;
}

const useSignUpStore = create<SignUpState>((set) => ({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  setName: (value) => set({ name: value }),
  setEmail: (value) => set({ email: value }),
  setPassword: (value) => set({ password: value }),
  setConfirmPassword: (value) => set({ confirmPassword: value }),
}));

export default useSignUpStore;
