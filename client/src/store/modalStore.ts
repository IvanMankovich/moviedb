import { create } from 'zustand';
import { ReactNode } from 'react';

export interface IModal {
  title?: string;
  modalContent?: ReactNode;
  onCancel?: () => void;
  footer?: ReactNode[] | null;
}

export type ISetModal = (modal: IModal | null) => void;

export interface IModalStore {
  modal: IModal | null;
  setModal: ISetModal;
}

export const useModalStore = create<IModalStore>((set) => ({
  modal: null,
  setModal: (modal) => set((state) => ({ ...state, modal: modal })),
}));
