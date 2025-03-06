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
import giuliaParts from "@/.data/giulia_parts.json"
import stelvioParts from "@/.data/stelvio_parts.json"
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

// Function to transform the data from JSON files to the format expected by the component
const transformPartsData = (data: any): Record<string, PartItem[]> => {
  const result: Record<string, PartItem[]> = {};
  
  // Iterate through each diagram section in the data
  Object.keys(data).forEach(diagramKey => {
    // Each diagram has blocks array containing parts
    const partsArray: PartItem[] = [];
    
    // Some diagrams may have multiple sections
    if (Array.isArray(data[diagramKey])) {
      data[diagramKey].forEach((section: any) => {
        if (section.blocks && Array.isArray(section.blocks)) {
          // Map each block to our PartItem format
          section.blocks.forEach((block: any, index: number) => {
            // Convert price string to number (remove $ and ,)
            let price = 0;
            if (block.price && typeof block.price === 'string') {
              price = parseFloat(block.price.replace('$', '').replace(',', ''));
            }
            
            partsArray.push({
              ref: (index + 1).toString(), // Using index+1 as reference if not provided
              partNo: block.part_number || '',
              description: block.part_name || '',
              price: price,
              compatibility: block.compatibility
            });
          });
        }
      });
    }
    
    // Convert diagram key to url-friendly format
    // For example: "giulia-front-bumper-p-series-replacement-parts" -> "front-bumper-p-series"
    let simplifiedKey = diagramKey;
    if (diagramKey.startsWith('giulia-')) {
      simplifiedKey = diagramKey.replace('giulia-', '').replace('-replacement-parts', '');
    } else if (diagramKey.startsWith('stelvio-')) {
      simplifiedKey = diagramKey.replace('stelvio-', '').replace('-replacement-parts', '');
    }
    
    if (partsArray.length > 0) {
      result[simplifiedKey] = partsArray;
    }
  });
  
  console.log('Transformed keys:', Object.keys(result));
  return result;
};

// Transform the imported data
const transformedGiuliaParts = transformPartsData(giuliaParts);
const transformedStelvioParts = transformPartsData(stelvioParts);

// Combine data from JSON files
const partsData: Record<string, Record<string, PartItem[]>> = {
  giulia: transformedGiuliaParts,
  stelvio: transformedStelvioParts
}

// Use the imported asset data
const assetsData: Record<string, Record<string, string>> = {
  giulia: giuliaAssets,
  stelvio: stelvioAssets
}



export default function DiagramPartsPage({ params }: DiagramPartsPageProps) {
  const { year, model, diagram } = params
  console.log('Diagram page params:', params);
  
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
  console.log('Model lower:', modelLower);
  console.log('Available models in partsData:', Object.keys(partsData));
  console.log('Available diagrams for model:', partsData[modelLower] ? Object.keys(partsData[modelLower]) : 'None');
  console.log('Current diagram:', diagram);

  const parts: PartItem[] = (partsData[modelLower] && partsData[modelLower][diagram]) 
    ? partsData[modelLower][diagram] 
    : [];
  
  console.log('Found parts:', parts.length);

  const assetUrl = (assetsData[modelLower] && assetsData[modelLower][diagram])
    ? assetsData[modelLower][diagram]
    : "/placeholder.svg";
  
  console.log('Asset URL:', assetUrl);

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

