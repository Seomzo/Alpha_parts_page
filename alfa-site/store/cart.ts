import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

interface CartItem {
  ref: string
  partNo: string
  description: string
  price: number
  quantity: number
}

interface CartState {
  items: CartItem[]
  lastVisitedPage: string | null
}

interface CartActions {
  addItem: (item: CartItem) => void
  removeItem: (partNo: string) => void
  updateQuantity: (partNo: string, quantity: number) => void
  clearCart: () => void
  totalItems: () => number
  setLastVisitedPage: (page: string) => void
}

type CartStore = CartState & CartActions

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      lastVisitedPage: null,
      addItem: (item) =>
        set((state) => {
          const existingItem = state.items.find((i) => i.partNo === item.partNo)
          if (existingItem) {
            return {
              items: state.items.map((i) =>
                i.partNo === item.partNo ? { ...i, quantity: i.quantity + item.quantity } : i,
              ),
            }
          }
          return { items: [...state.items, item] }
        }),
      removeItem: (partNo) =>
        set((state) => ({
          items: state.items.filter((item) => item.partNo !== partNo),
        })),
      updateQuantity: (partNo, quantity) =>
        set((state) => ({
          items: state.items.map((item) => (item.partNo === partNo ? { ...item, quantity } : item)),
        })),
      clearCart: () => set({ items: [] }),
      totalItems: () => {
        const state = get()
        return state.items.reduce((total, item) => total + item.quantity, 0)
      },
      setLastVisitedPage: (page) => set({ lastVisitedPage: page }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
      version: 1,
    },
  ),
)

