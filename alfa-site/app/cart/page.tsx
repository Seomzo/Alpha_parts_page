"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Header from "@/components/header"
import { Button } from "@/components/ui/button"
import { useCartStore } from "@/store/cart"

export default function CartPage() {
  const router = useRouter()
  const [isClient, setIsClient] = useState(false)
  const { items, removeItem, updateQuantity, totalItems, lastVisitedPage } = useCartStore()

  // Handle hydration mismatch
  useEffect(() => {
    setIsClient(true)
  }, [])

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const handleContinueShopping = () => {
    if (lastVisitedPage) {
      router.push(lastVisitedPage)
    } else {
      router.push("/")
    }
  }

  if (!isClient) {
    return null // Prevent hydration mismatch
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Your cart</h1>
          <Button variant="link" className="text-primary hover:text-primary/90" onClick={handleContinueShopping}>
            Continue shopping
          </Button>
        </div>

        <div className="border rounded-lg p-8">
          {!items || items.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-6">Your cart is empty</p>
              <Button className="bg-primary hover:bg-primary/90 text-white px-8" onClick={handleContinueShopping}>
                Continue shopping
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map((item) => (
                <div
                  key={item.partNo}
                  className="grid grid-cols-[1fr,auto,auto,auto] gap-8 py-4 border-b last:border-0 items-center"
                >
                  <div>
                    <div className="font-medium">{item.partNo}</div>
                    <div className="text-sm text-gray-600">{item.description}</div>
                  </div>
                  <div className="text-right">${item.price.toFixed(2)}</div>
                  <div>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item.partNo, Number.parseInt(e.target.value) || 1)}
                      className="w-20 px-3 py-1 border rounded text-center"
                    />
                  </div>
                  <Button
                    variant="ghost"
                    className="text-red-500 hover:text-red-600 hover:bg-red-50"
                    onClick={() => removeItem(item.partNo)}
                  >
                    Remove
                  </Button>
                </div>
              ))}

              <div className="pt-6 border-t">
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

