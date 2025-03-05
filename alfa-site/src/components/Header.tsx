import type React from "react"
import { Link } from "react-router-dom"
import { ShoppingCart, Search, User } from "lucide-react"
import { useCart } from "../hooks/useCart"

const Header: React.FC = () => {
  const { totalItems } = useCart()

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold">
          Miller Motorcars
        </Link>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Start Typing To Find What You Need..."
              className="pl-10 pr-4 py-2 border rounded-full w-64"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>
          <Link to="/login" className="text-gray-600 hover:text-gray-800">
            <User size={24} />
          </Link>
          <Link to="/cart" className="text-gray-600 hover:text-gray-800 relative">
            <ShoppingCart size={24} />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Header

