"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useCart } from "../hooks/useCart"

const DiagramPage: React.FC = () => {
  const { year, model, part } = useParams<{ year: string; model: string; part: string }>()
  const navigate = useNavigate()
  const { addItem } = useCart()
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const parts = [
    { ref: "1", partNo: "68366711AA", description: "FASCIA, Front", price: 1110.0 },
    { ref: "2A", partNo: "6EW71TZZAA", description: "COVER, Tow Hook - Right", price: 33.0 },
  ]

  const handleAddToCart = (part: any) => {
    addItem({ ...part, quantity: 1 })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div
        className={`sticky top-16 bg-white z-40 transition-opacity duration-300 ${scrollY > 100 ? "opacity-100" : "opacity-0"}`}
      >
        <button onClick={() => navigate(-1)} className="mb-4 text-blue-600 hover:text-blue-800">
          ← Back to Parts Selection
        </button>
      </div>

      <div
        className={`transition-opacity duration-300 ${scrollY > 100 ? "opacity-0" : "opacity-100"}`}
        style={{ maxHeight: scrollY > 100 ? "0" : "1000px", overflow: "hidden" }}
      >
        <h1 className="text-3xl font-bold mb-4">
          {year} Alfa Romeo {model}
        </h1>
        <h2 className="text-2xl mb-4">{part} Replacement Parts</h2>
        <p className="mb-4">Please refer to the graphic below for help navigating the replacement parts.</p>
        <p className="mb-4">The below diagram has reference numbers on each part for easy identification.</p>
        <p className="mb-8">
          <strong>Have Questions?</strong> Please e-mail us at{" "}
          <a href="mailto:mmcstore@millermotorcars.com" className="text-blue-600 hover:underline">
            mmcstore@millermotorcars.com
          </a>{" "}
          or call us at{" "}
          <a href="tel:866.295.8874" className="text-blue-600 hover:underline">
            866.295.8874
          </a>
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-07%20at%2012.21.29%E2%80%AFPM-KMzf6BQ9KixYs0dOPRnP07mM24FSTK.png"
            alt="Parts diagram"
            className="w-full h-auto"
          />
        </div>
        <div className="lg:w-1/3">
          <div className="bg-white rounded-lg shadow-sm">
            <div className="grid grid-cols-[auto,1fr,auto,auto] gap-4 p-4 border-b font-semibold">
              <div>#</div>
              <div>Part No.</div>
              <div>Price</div>
              <div></div>
            </div>
            {parts.map((part) => (
              <div key={part.ref} className="grid grid-cols-[auto,1fr,auto,auto] gap-4 p-4 border-b items-center">
                <div>{part.ref}</div>
                <div>
                  <div>{part.partNo}</div>
                  <div className="text-sm text-gray-600">{part.description}</div>
                </div>
                <div>${part.price.toFixed(2)}</div>
                <button
                  onClick={() => handleAddToCart(part)}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Add
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DiagramPage

