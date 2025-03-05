import Image from "next/image"

export default function BrandNav() {
  const brands = [
    { name: "Alfa Romeo", logo: "/placeholder.svg" },
    { name: "Aston Martin", logo: "/placeholder.svg" },
    { name: "Bentley", logo: "/placeholder.svg" },
    { name: "Bugatti", logo: "/placeholder.svg" },
    { name: "Ferrari", logo: "/placeholder.svg" },
    { name: "Maserati", logo: "/placeholder.svg" },
    { name: "McLaren", logo: "/placeholder.svg" },
    { name: "Pagani", logo: "/placeholder.svg" },
    { name: "Rolls-Royce", logo: "/placeholder.svg" },
  ]

  return (
    <div className="border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between overflow-x-auto">
        {brands.map((brand) => (
          <div key={brand.name} className="relative w-20 h-8">
            <Image src={brand.logo || "/placeholder.svg"} alt={brand.name} fill className="object-contain" />
          </div>
        ))}
      </div>
    </div>
  )
}

