import { devtools, persist } from 'zustand/middleware';
import { create } from 'zustand';

interface FormState {
  count: number;
  increment: () => void;
  decrement: () => void;
  update: (item: number) => void;
}

export const useForm = create<FormState>()(
  devtools(
    persist(
      (set) => ({
        count: 0,
        increment: () => set((state) => ({ count: state.count + 1 })),
        decrement: () => set((state) => ({ count: state.count - 1 })),
        update: (item) => set(() => ({ count: item })),
      }),
      {
        name: 'form-storage',
      }
    )
  )
);
