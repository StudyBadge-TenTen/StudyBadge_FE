import { create } from 'zustand';

interface StudyState {
  title: string;
  description: string;
  category: string;
  startDate: string;
  endDate: string;
  maxParticipants: number;
  meetingType: 'offline' | 'online';
  location: string;
  link: string;
  fee: number;
  setField: (field: keyof Omit<StudyState, 'setField' | 'resetForm'>, value: any) => void;
  resetForm: () => void;
}

export const useStudyStore = create<StudyState>((set) => ({
  title: '',
  description: '',
  category: '',
  startDate: '',
  endDate: '',
  maxParticipants: 3,
  meetingType: 'offline',
  location: '',
  link: '',
  fee: 0,
  setField: (field, value) => set((state) => ({ ...state, [field]: value })),
  resetForm: () => set({
    title: '',
    description: '',
    category: '',
    startDate: '',
    endDate: '',
    maxParticipants: 3,
    meetingType: 'offline',
    location: '',
    link: '',
    fee: 0,
  }),
}));