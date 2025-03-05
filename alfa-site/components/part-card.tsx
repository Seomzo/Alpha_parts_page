import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

interface PartCardProps {
  title: string
  image: string
  year: string
  model: string
}

export default function PartCard({ title, image, year, model }: PartCardProps) {
  const router = useRouter()

  const handleClick = () => {
    // Convert the title to a URL-friendly format
    const partSlug = title.toLowerCase().replace(/ /g, "-")
    router.push(`/${year}/${model}/${partSlug}`)
  }

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
      <div className="bg-primary p-4">
        <div className="bg-white h-42 w-full flex items-center justify-center p-4 relative">
          <div className="relative w-full h-40">
            <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover" />
          </div>
        </div>
      </div>

      <div className="p-6 text-center">
        <p className="text-sm text-gray-600 mb-1">
          {year} Alfa Romeo {model.toUpperCase()}
        </p>
        <h3 className="text-xl font-bold mb-4">{title}</h3>
        <Button variant="outline" className="w-full" onClick={handleClick}>
          Shop Diagram
        </Button>
      </div>
    </div>
  )
}

