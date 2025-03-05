import type React from "react"
import { Link } from "react-router-dom"
import { useCart } from "../hooks/useCart"

const CartPage: React.FC = () => {
  const { items, removeItem, updateQuantity, totalItems, total } = useCart()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Your cart</h1>
        <Link to="/" className="text-blue-600 hover:text-blue-800">
          Continue shopping
        </Link>
      </div>

      <div className="border rounded-lg p-8">
        {items.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-6">Your cart is empty</p>
            <Link to="/" className="bg-blue-600 text-white px-8 py-3 rounded hover:bg-blue-700">
              Continue shopping
            </Link>
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
                <button onClick={() => removeItem(item.partNo)} className="text-red-500 hover:text-red-600">
                  Remove
                </button>
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
  )
}

export default CartPage

