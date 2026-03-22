import { create } from 'zustand';

const useCounter = create((set) => ({
  count: 0,
  updateCount: () =>
    set((count: { count: number }) => ({ count: count.count + 1 })),
}));

export default useCounter;
