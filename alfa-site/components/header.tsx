"use client"

import { Menu, Search, ShoppingCart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useCartStore } from "@/store/cart"

export default function Header() {
  const totalItems = useCartStore((state) => state.totalItems())

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="lg:hidden">
            <Menu className="h-6 w-6" />
          </Button>
          <Image
            src="/placeholder.svg"
            alt="ALFA ROMEO OF SAN JOSE"
            width={165}
            height={40}
            className="h-10 w-auto"
          />
        </div>

        <div className="hidden md:flex flex-1 max-w-xl mx-4">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input className="w-full pl-10" placeholder="Start Typing To Find What You Need..." />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost">Login</Button>
          <Link href="/cart">
            <div className="relative">
              <ShoppingCart className="h-6 w-6" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </div>
          </Link>
        </div>
      </div>
    </header>
  )
}

