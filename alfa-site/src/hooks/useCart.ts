import { create } from "zustand"
import { persist } from "zustand/middleware"

interface CartItem {
  ref: string
  partNo: string
  description: string
  price: number
  quantity: number
}

interface CartStore {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (partNo: string) => void
  updateQuantity: (partNo: string, quantity: number) => void
  clearCart: () => void
  totalItems: () => number
  total: () => number
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
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
      total: () => {
        const state = get()
        return state.items.reduce((total, item) => total + item.price * item.quantity, 0)
      },
    }),
    {
      name: "cart-storage",
    },
  ),
)

