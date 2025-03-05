import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface CarModelCardProps {
  model: string
  image: string
  years: number[]
}

export default function CarModelCard({ model, image, years }: CarModelCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-8 flex flex-col items-center">
      <Image
        src={image || "/placeholder.svg"}
        alt={`Alfa Romeo ${model}`}
        width={300}
        height={200}
        className="w-full h-full mb-6 object-contain"
      />

      <h2 className="text-2xl font-bold mb-1">Alfa Romeo</h2>
      <h3 className="text-2xl mb-6">{model}</h3>

      <p className="text-gray-600 mb-4">Please Choose A Model Year</p>

      <div className="grid grid-cols-3 gap-4 w-full max-w-xs">
        {years.map((year) => (
          <Link key={year} href={`/${year}/${model.toLowerCase()}`}>
            <Button variant="outline" className="w-full border-2 hover:bg-gray-50">
              {year}
            </Button>
          </Link>
        ))}
      </div>
    </div>
  )
}

