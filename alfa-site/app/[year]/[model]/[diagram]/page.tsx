"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useRouter, usePathname } from "next/navigation"
import Header from "@/components/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useCartStore } from "@/store/cart"
import { toast } from "sonner"


// Import JSON data
import giuliaParts from "@/.data/giulia-parts.json"
import stelvioParts from "@/.data/stelvio-parts.json"
import giuliaAssets from "@/.data/giulia-assets.json"
import stelvioAssets from "@/.data/stelvio-assets.json"


interface DiagramPartsPageProps {
  params: {
    year: string
    model: string
    diagram: string
  }
}

interface PartItem {
  ref: string
  partNo: string
  description: string
  price: number
  compatibility?: string  // Make it optional
}


// Combine data from JSON files
const partsData: Record<string, Record<string, PartItem[]>> = {
  giulia: giuliaParts,
  stelvio: stelvioParts
}

// const assetsData: Record<string, Record<string, string>> = {
//   giulia: giuliaAssets,
//   stelvio: stelvioAssets
// }

// const model = "giulia" // This should be dynamic based on the URL or user selection

// const partsData: Record<string, Record<string, PartItem[]>> = {
//   giulia: {
//     // FRONT BUMPER P SERIES
//     "front-bumper-p-series": [
//       {
//         ref: "1",
//         partNo: "G-FB-001",
//         description: "FASCIA, Front",
//         price: 599.99,
//       },
//       {
//         ref: "2A",
//         partNo: "G-FB-002",
//         description: "COVER, Tow Hook - Right",
//         price: 299.99,
//       },
//       {
//         ref: "2B",
//         partNo: "G-FB-002",
//         description: "COVER, Tow Hook - Left",
//         price: 299.99,
//       },
//       {
//         ref: "3",
//         partNo: "G-FB-002",
//         description: "GRILLE, Fascia, Right",
//         price: 299.99,
//       },
//       {
//         ref: "4",
//         partNo: "G-FB-002",
//         description: "GRILLE, Fascia, Left",
//         price: 299.99,
//       },
//       {
//         ref: "5",
//         partNo: "G-FB-002",
//         description: "GRILLE, Lower",
//         price: 299.99,
//       },
//       {
//         ref: "6A",
//         partNo: "G-FB-002",
//         description: "AIR DAM,Front - Left",
//         price: 299.99,
//       },
//       {
//         ref: "6B",
//         partNo: "G-FB-002",
//         description: "AIR DAM,Front - Right",
//         price: 299.99,
//       },
//       {
//         ref: "7",
//         partNo: "G-FB-002",
//         description: "BEZEL, Adaptive Cruise Control",
//         price: 299.99,
//       },
//       {
//         ref: "8",
//         partNo: "G-FB-002",
//         description: "GRILLE , Fascia (2018-2020)",
//         price: 299.99,
//       },
//       {
//         ref: "9",
//         partNo: "G-FB-002",
//         description: "SCREW",
//         price: 299.99,
//       },
//       {
//         ref: "10",
//         partNo: "G-FB-002",
//         description: "BRACKET, License Plate (2018-2020)",
//         price: 299.99,
//       },
//       {
//         ref: "11",
//         partNo: "G-FB-002",
//         description: "SCREW",
//         price: 299.99,
//       },
//       {
//         ref: "12",
//         partNo: "G-FB-002",
//         description: "AIR DAM, Front",
//         price: 299.99,
//       },
//       {
//         ref: "13",
//         partNo: "G-FB-002",
//         description: "SHIELD, Fascia",
//         price: 299.99,
//       },
//       {
//         ref: "14",
//         partNo: "G-FB-002",
//         description: "CROSSMEMBER, Front Support",
//         price: 299.99,
//       },
//       {
//         ref: "15",
//         partNo: "G-FB-002",
//         description: "DRIVE MOTOR, Active Aero Splitter",
//         price: 299.99,
//       },
//       {
//         ref: "16",
//         partNo: "G-FB-002",
//         description: "SCREW, Spoiler Motor Attaching",
//         price: 299.99,
//       },
//       {
//         ref: "17",
//         partNo: "G-FB-002",
//         description: "NUT",
//         price: 299.99,
//       },
//       {
//         ref: "18",
//         partNo: "G-FB-002",
//         description: "SEALER",
//         price: 299.99,
//       },
//       {
//         ref: "19A",
//         partNo: "G-FB-002",
//         description: "COVER, Headlamp Washer - Right, [JHS]",
//         price: 299.99,
//       },
//       {
//         ref: "19B",
//         partNo: "G-FB-002",
//         description: "COVER, Headlamp Washer - Left, [JHS]",
//         price: 299.99,
//       },
//       {
//         ref: "20",
//         partNo: "G-FB-002",
//         description: "SCREW",
//         price: 299.99,
//       },
//       {
//         ref: "21",
//         partNo: "G-FB-002",
//         description: "SCREW, Hex Head, M8",
//         price: 299.99,
//       },
//       {
//         ref: "22",
//         partNo: "G-FB-002",
//         description: "RIVET, M4.8X16.00",
//         price: 299.99,
//       },
//     ],
//     // FRONT BUMPER LT SERIES
//     "front-bumper-l-and-t-series": [
//       {
//         ref: "1A",
//         partNo: "G-FB-001",
//         description: "FASCIA, Front - [MCY] (2018-2020)",
//         price: 599.99,
//       },
//       {
//         ref: "1B",
//         partNo: "G-FB-002",
//         description: "FASCIA, Front - [MCY], [XAG]",
//         price: 299.99,
//       },
//       {
//         ref: "1C",
//         partNo: "G-FB-002",
//         description: "FASCIA, Front",
//         price: 299.99,
//       },
//       {
//         ref: "1D",
//         partNo: "G-FB-002",
//         description: "FASCIA, Front - [XAG]",
//         price: 299.99,
//       },
//       {
//         ref: "2A",
//         partNo: "G-FB-002",
//         description: "PLUG, Tow Hook - Right",
//         price: 299.99,
//       },
//       {
//         ref: "2B",
//         partNo: "G-FB-002",
//         description: "PLUG, Tow Hook - Left",
//         price: 299.99,
//       },
//       {
//         ref: "2C",
//         partNo: "G-FB-002",
//         description: "PLUG, Tow Hook - Right [MCY]",
//         price: 299.99,
//       },
//       {
//         ref: "2D",
//         partNo: "G-FB-002",
//         description: "PLUG, Tow Hook - Left [MCY]",
//         price: 299.99,
//       },
//       {
//         ref: "3A",
//         partNo: "G-FB-002",
//         description: "GRILLE, Fascia - Right, [MCY], [XAG]",
//         price: 299.99,
//       },
//       {
//         ref: "3B",
//         partNo: "G-FB-002",
//         description: "GRILLE, Fascia - Right, [XAG]",
//         price: 299.99,
//       },
//       {
//         ref: "3C",
//         partNo: "G-FB-002",
//         description: "GRILLE, Fascia - Right",
//         price: 299.99,
//       },
//       {
//         ref: "3D",
//         partNo: "G-FB-002",
//         description: "GRILLE, Fascia - Right, [MCY] (2018-2020)",
//         price: 299.99,
//       },
//       {
//         ref: "4A",
//         partNo: "G-FB-002",
//         description:"GRILLE, Fascia - Left, [XAG]",
//         price: 299.99,
//       },
//       {
//         ref: "4B",
//         partNo: "G-FB-002",
//         description: "GRILLE, Fascia - Left, [XAG]",
//         price: 299.99,
//       },
//       {
//         ref: "4C",
//         partNo: "G-FB-002",
//         description: "GRILLE, Fascia - Left",
//         price: 299.99,
//       },
//       {
//         ref: "4D",
//         partNo: "G-FB-002",
//         description: "GRILLE, Fascia - Left [MCY] (2018-2020)",
//         price: 299.99,
//       },
//       {
//         ref:"4E", 
//         partNo: "G-FB-002",
//         description: "GRILLE, Fascia - Left, [MCY], [XAG]",
//         price: 299.99,
//       },
//       {
//         ref: "5A",
//         partNo: "G-FB-002",
//         description: "BEZEL, Air Inlet - Right [MCY]",
//         price: 299.99,
//       },
//       {
//         ref: "5B",
//         partNo: "G-FB-002",
//         description: "BEZEL, Air Inlet - Left [MCY]",
//         price: 299.99,
//       },
//       {
//         ref: "5C",
//         partNo: "G-FB-002",
//         description: "BEZEL, Air Inlet - Right [MCY]",
//         price: 299.99,
//       },
//       {
//         ref: "5D",
//         partNo: "G-FB-002",
//         description: "BEZEL, Air Inlet - Right",
//         price: 299.99,
//       },
//       {
//         ref: "5E",
//         partNo: "G-FB-002",
//         description: "BEZEL, Air Inlet - Left",
//         price: 299.99,
//       },
//       {
//         ref: "6A",
//         partNo: "G-FB-002",
//         description: "BEZEL, Adaptive Cruise Control",
//         price: 299.99,
//       },
//       {
//         ref: "6B",
//         partNo: "G-FB-002",
//         description: "BEZEL, Adaptive Cruise Control [MCY]",
//         price: 299.99,
//       },
//       {
//         ref: "7A",
//         partNo: "G-FB-002",
//         description: "GRILLE, Fascia - [MCY]",
//         price: 299.99,
//       },
//       {
//         ref: "7B",
//         partNo: "G-FB-002",
//         description: "GRILLE, Fascia (2018-2020)",
//         price: 299.99,
//       },
//       {
//         ref: "8",
//         partNo: "G-FB-002",
//         description: "SCREW",
//         price: 299.99,
//       },
//       {
//         ref: "9A",
//         partNo: "G-FB-002",
//         description: "BRACKET, License Plate (2018-2020)",
//         price: 299.99,
//       },
//       {
//         ref: "9B",
//         partNo: "G-FB-002",
//         description: "BRACKET, License Plate",
//         price: 299.99,
//       },
//       {
//         ref: "10",
//         partNo: "G-FB-002",
//         description: "SCREW",
//         price: 299.99,
//       },
//       {
//         ref: "11A",
//         partNo: "G-FB-002",
//         description: "FASCIA, Front Lower",
//         price: 299.99,
//       },
//       {
//         ref: "11B",
//         partNo: "G-FB-002",
//         description: "FASCIA, Front Lower - [MCY]",
//         price: 299.99,
//       },
//       {
//         ref: "12",
//         partNo: "G-FB-002",
//         description: "SEALER",
//         price: 299.99,
//       },
//       {
//         ref: "13",
//         partNo: "G-FB-002",
//         description: "CLIP, Spring",
//         price: 299.99,
//       },
//       {
//         ref: "14",
//         partNo: "G-FB-002",
//         description: "SCREW, Special Head, M4.8X1.8X16.9",
//         price: 299.99,
//       },
//       {
//         ref: "15",
//         partNo: "G-FB-002",
//         description: "DEFLECTOR, Air [MCY]",
//         price: 299.99,
//       },
//     ],
//     // REAR BUMPER
//     "rear-bumper": [
//       {
//         ref: "1",
//         partNo: "G-RB-001",
//         description: "Rear Bumper Cover",
//         price: 549.99,
//       },
//       {
//         ref: "2",
//         partNo: "G-RB-002",
//         description: "Rear Bumper Reinforcement",
//         price: 279.99,
//       },
//     ],
//     //diagram
//   },
//   stelvio: {
//     "front-bumper-p-series": [
//       {
//         ref: "1",
//         partNo: "S-FB-001",
//         description: "Front Bumper Cover",
//         price: 999.99,
//       },
//       {
//         ref: "2",
//         partNo: "S-FB-002",
//         description: "Front Bumper Reinforcement",
//         price: 999.99,
//       },
//     ],
//     "front-bumper-l-and-t-series": [
//       {
//         ref: "1",
//         partNo: "S-FB-001",
//         description: "Front Bumper Cover",
//         price: 999.99,
//       },
//       {
//         ref: "2",
//         partNo: "S-FB-002",
//         description: "Front Bumper Reinforcement",
//         price: 999.99,
//       },
//     ],
//     // Add more parts for Stelvio here
//   },
// }

const assetsData: Record<string, Record<string, string>> = {
  giulia: {
    "front-bumper-p-series": "/assets/guilia/2018-2022-alfa-romeo-giulia-front-bumper-p-series-upt.webp",
    "front-bumper-l-and-t-series": "/assets/guilia/2018-2022-alfa-romeo-giulia-front-bumper-l-and-t-series-upt.webp",
    "rear-bumper": "/assets/guilia/2018-alfa-romeo-giulia-rear-bumper-upt.webp",
    "front-suspension-control-arms": "/assets/guilia/2018-alfa-romeo-giulia-front-suspension-control-arms-upt.webp",
    "front-suspension-shocks-and-springs": "/assets/guilia/2018-alfa-romeo-giulia-front-suspension-shocks-and-springs-upt.webp",
    "rear-suspension": "/assets/guilia/2018-alfa-romeo-giulia-rear-suspension-upt.webp",
    "headlights": "/assets/guilia/2018-alfa-romeo-giulia-headlights-upt.webp",
    "lm9-headlights": "/assets/guilia/2018-alfa-romeo-giulia-lm9-headlights-upt.webp",
    "taillights": "/assets/guilia/2018-alfa-romeo-giulia-taillights-upt.webp",
    "aperture-panel": "/assets/guilia/2018alfaromeogiuliaaperturepanel-1643659259218.webp",
    "hood": "/assets/guilia/2018alfaromeogiuliahoodandrelated-1643660553504.webp",
    "front-fenders": "/assets/guilia/2018alfaromeogiuliafrontfenders-1643662268482.webp",
    "door-lock-cylinders": "/assets/guilia/2018alfaromeogiuliadoorlockcylinders-1643661036468.webp",
    "front-door-shell-and-hinges": "/assets/guilia/2018alfaromeogiuliafrontdoorshellandhinges-1643661628563.webp",
    "rear-door-shell-and-hinges": "/assets/guilia/2018alfaromeogiuliareardoorshellandhinges-1643736736396.webp",
  },
  //  add assets for other models here
  stelvio: {
    "front-bumper-p-series": "/assets/stelvio/2018-alfa-romeo-stelvio-front-bumper-upt.webp",
    "front-bumper-l-and-t-series": "/assets/stelvio/alfa-romeo-stelvio-front-bumper-l-and-t-series-upt.webp",
    "s-rear-bumper": "/assets/stelvio/front_suspension_control_arms_stelvio_alfa-1638291072742_v-1638291073.jpg",
    "s-rear-bumper-l-and-t-series": "/assets/stelvio/front_suspension_shocks_and_springs_stelvio_alfa-1638291080131_v-1638291080.jpg",
    "s-rear-bumper-p-series": "/assets/stelvio/rear_suspension_stelvio_alfa-1638291087405_v-1638291087.jpg",
    "s-front-suspension-control-arms": "/assets/stelvio/headlights_stelvio_alfa-1638291094588_v-1638291094.jpg",
    "s-front-suspension-shocks-and-springs": "/assets/stelvio/lm9_headlights_stelvio_alfa-1638291101879_v-1638291102.jpg",
    "s-rear-suspension": "/assets/stelvio/taillights_stelvio_alfa-1638291109115_v-1638291109.jpg",
    "s-rear-suspension-crossmember": "/assets/stelvio/aperture_panel_stelvio_alfa-1638291116376_v-1638291116.jpg",
    "s-headlights": "/assets/stelvio/aperture_panel_stelvio_alfa-1638291116376_v-1638291116.jpg",
    "s-taillights": "/assets/stelvio/hood_stelvio_alfa-1638291123640_v-1638291124.jpg",
    "s-front-brakes": "/assets/stelvio/front_fenders_stelvio_alfa-1638291130904_v-1638291131.jpg",
    "s-rear-brakes": "/assets/stelvio/door_lock_cylinders_stelvio_alfa-1638291138177_v-1638291138.jpg",
    "s-hood-hinge-prop": "/assets/stelvio/front_door_shell_and_hinges_stelvio_alfa-1638291145450_v-1638291145.jpg",
    "s-fenders": "/assets/stelvio/rear_door_shell_and_hinges_stelvio_alfa-1638291152718_v-1638291153.jpg",
    "s-door-lock-cylinders": "/assets/stelvio/front_bumper_p_series_stelvio_alfa-1638291058263_v-1638291059.jpg",
    "s-aperture-panel": "/assets/stelvio/front_bumper_p_series_stelvio_alfa-1638291058263_v-1638291059.jpg",
    "s-front-door-shell-and-hinges": "/assets/stelvio/front_bumper_p_series_stelvio_alfa-1638291058263_v-1638291059.jpg",
    "s-rear-door-shell-and-hinges": "/assets/stelvio/front_bumper_p_series_stelvio_alfa-1638291058263_v-1638291059.jpg",
  }
}

export default function DiagramPartsPage({ params }: DiagramPartsPageProps) {
  const { year, model, diagram } = params
  const router = useRouter()
  const pathname = usePathname()
  const [showInstructions, setShowInstructions] = useState(true)
  const { addItem, setLastVisitedPage } = useCartStore()

  useEffect(() => {
    const handleScroll = () => {
      setShowInstructions(window.scrollY < 100)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
      setLastVisitedPage(pathname ?? '')
    }, [pathname, setLastVisitedPage])

  // Use the dynamic model
  const modelLower = model.toLowerCase()

  const parts: PartItem[] = (partsData[modelLower] as Record<string, PartItem[]>)[diagram] || []

  const assetUrl = assetsData[modelLower]?.[diagram] || "/placeholder.svg"

  const handleAddToCart = (part: PartItem, quantity: number) => {
    addItem({ ...part, quantity })
    toast.success("Item added to cart")
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Button variant="outline" className="mb-8" onClick={() => router.push(`/${params.year}/${params.model}`)}>
          ← Back to Parts Selection
        </Button>

        <div
          className={` text-center mb-12 transition-all duration-300 round ${
            showInstructions ? "opacity-100 max-h-[500px]" : "opacity-0 max-h-0"
          }`}
        >
          <p className="text-lg mb-2">Please refer to the graphic below for help navigating the replacement parts.</p>
          <p className="text-lg mb-4">The below diagram has reference numbers on each part for easy identification.</p>
          <p className="text-lg">
            <span className="font-semibold">Have Questions?</span> Please e-mail us at{" "}
            <a href="mailto:email@millermotorcars.com" className="text-primary hover:underline">
              Store email
            </a>{" "}
            or call us at{" "}
            <a href="tel:866.295.8874" className="text-primary hover:underline">
              408.555.1212
            </a>
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left side - Diagram */}
          <div className="lg:w-2/3">
            <div className="sticky top-4">
              {/* <h2 className="text-2xl font-bold mb-4">
                {params.year} Alfa Romeo {params.model}
              </h2>
              <h3 className="text-xl mb-6">{params.diagram.split("-").join(" ")} Replacement Parts</h3> */}
              <div className="relative w-full h-[1200px] bg-white rounded-lg shadow-sm">
                <Image src={assetUrl} alt={`${diagram} diagram`} fill className="object-top object-contain" />
              </div>
            </div>
          </div>

          {/* Right side - Parts list */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-sm">
              <div className="grid grid-cols-[auto,1fr,auto,auto,auto] gap-4 p-4 border-b font-semibold">
                <div>#</div>
                <div>Part No.</div>
                <div>Price</div>
                <div>Qty</div>
                <div></div>
              </div>
              <div className="max-h-[800px] overflow-y-auto">
                {parts.map((part) => (
                  <div
                    key={part.ref}
                    className="grid grid-cols-[auto,1fr,auto,auto,auto] gap-4 p-4 border-b items-center hover:bg-gray-50"
                  >
                    <div>{part.ref}</div>
                    <div>
                      <div>{part.partNo}</div>
                      <div className="text-sm text-gray-600">{part.description}</div>
                      {part.compatibility && (
                        <div className="text-xs italic text-gray-500">
                          *Compatible with {part.compatibility}
                        </div>
                      )}
                    </div>
                    <div className="whitespace-nowrap">${part.price.toFixed(2)}</div>
                    <div>
                      <Input
                        type="number"
                        min="1"
                        defaultValue="1"
                        className="w-16 text-center"
                        id={`qty-${part.ref}`}
                      />
                    </div>
                    <div>
                      <Button
                        variant="default"
                        className="bg-primary hover:bg-primary/90"
                        onClick={() => {
                          const qty = Number.parseInt(
                            (document.getElementById(`qty-${part.ref}`) as HTMLInputElement).value,
                          )
                          handleAddToCart(part, qty)
                        }}
                      >
                        Add
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

