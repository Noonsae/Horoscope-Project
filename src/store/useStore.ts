import { create } from 'zustand'; // 'create'를 명시적으로 가져옵니다.

interface StoreState {
  count: number;
  increment: () => void;
  decrement: () => void;
}

const useStore = create<StoreState>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 }))
}));

const { count, increment } = useStore.getState();
console.log('Initial count:', count); // 0
increment();
console.log('Updated count:', useStore.getState().count); // 1
