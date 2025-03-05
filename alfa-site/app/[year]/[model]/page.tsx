"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import Header from "@/components/header"
import PartCard from "@/components/part-card"
import { Button } from "@/components/ui/button"

interface PageProps {
  params: {
    year: string
    model: string
  }
}

interface Part {
  title: string
  image: string
  slug: string
}


export default function ModelPage({ params }: PageProps) {
  const { model, year } = params
  const router = useRouter()

  // const modelLower = model.toLowerCase()
  const modelLower = params.model.toLowerCase()
  const imageSrc = modelLower === "stelvio" 
  ? "/assets/stelvio/boutique_replacement_parent_column_stelvio_icon-1638290406765_v-1638290407.png" 
  : "/assets/guilia/giulia.png"

  let parts: Part[] = []

  if (model === "giulia") {
    parts = [
      {
        title: "Front Bumper P Series",
        image: "/assets/guilia/assets-front_bumper_p_series_guilia_alfa-1638289538801.jpg",
        slug: "front-bumper-p-series",
      },
      {
        title: "Front Bumper L and T Series",
        image: "/assets/guilia/assets-front_bumper_lt_series_guilia_alfa-1638289552761.jpg",
        slug: "front-bumper-lt-series",
      },
      {
        title: "Rear Bumper",
        image: "/assets/guilia/assets-rear_bumper_guilia_alfa-1638289564645.jpg",
        slug: "rear-bumper",
      },
      {
        title: "Front Suspension Control Arms",
        image: "/assets/guilia/assets-front_suspension_control_arms_guilia_alfa-1638289580810.jpg",
        slug: "front-suspension-control-arms",
      },
      {
        title: "Front Suspension Shocks and Springs",
        image: "/assets/guilia/assets-front_suspension_shocks_springs_guilia_alfa-1638289593536.jpg",
        slug: "front-suspension-shocks-and-springs",
      },
      {
        title: "Rear Suspension",
        image: "/assets/guilia/assets-rear_suspension_guilia_alfa-1638289607870.jpg",
        slug: "rear-suspension",
      },
      {
        title: "Headlights",
        image: "/assets/guilia/assets-headlights_guilia_alfa-1638289620886.jpg",
        slug: "headlights",
      },
      {
        title: "LM9 Headlights",
        image: "/assets/guilia/assets-lm9_headlights_guilia_alfa-1638289632195.jpg",
        slug: "lm9-headlights",
      },
      {
        title: "Taillights",
        image: "/assets/guilia/assets-taillights_guilia_alfa-1638289642843.jpg",
        slug: "taillights",
      },
      
      {
        title: "Aperture Panel",
        image: "/assets/guilia/2018-alfa-gulia-aperture_panel_giulia_alfa_romeo1637647761522-1643740690157.webp",
        slug: "aperture-panel",
      },
      {
        title: "Hood",
        image: "/assets/guilia/2018-hood_giulia_alfa_romeo1637647761522-1643740776570.webp",
        slug: "hood",
      },
      {
        title: "Front Fenders",
        image: "/assets/guilia/front_fenders_giulia_alfa_romeo1637647761522-1643740860968.webp",
        slug: "front-fenders",
      },
      {
        title: "Door Lock Cylinders",
        image: "/assets/guilia/door_lock_clylinders_giulia_alfa_romeo1637647761522-1643740966889.webp",
        slug: "door-lock-cylinders",
      },
      {
        title: "Front Door Shell and Hinges",
        image: "/assets/guilia/front_door_shell_giulia_alfa_romeo1637647761522-1643741091556.webp",
        slug: "front-door-shell-and-hinges",
      },
      {
        title: "Rear Door Shell and Hinges",
        image: "/assets/guilia/rear_door_shell_giulia_alfa_romeo1637647761522-1643741188151.webp",
        slug: "rear-door-shell-and-hinges",
      }
    ]
  } else if (model === "stelvio") {
    parts = [
      
      {
        title: "Front Bumper P Series",
        image: "/assets/stelvio/front_bumper_p_series_stelvio_alfa-1638291058263_v-1638291059.jpg",
        slug: "front-bumper-p-series",
      },
      {
        title: "Front Bumper L and T Series",
        image: "/assets/stelvio/front_bumper_20_series_stelvio_alfa-1638290952508_v-1638290953.jpg",
        slug: "s-front-bumper-lt-series",
      },
      {
        title: "Rear Bumper",
        image: "/assets/stelvio/rear_bumper_stelvio_alfa-1638291384411_v-1638291385.jpg",
        slug: "s-rear-bumper",
      },
      {
        title: "Rear Bumper L and T Series",
        image: "/assets/stelvio/rear_bumper_lt_stelvio_alfa-1638291254996_v-1638291255.jpg",
        slug: "s-rear-bumper-l-and-t-series",
      },
      {
        title: "Rear Bumper P Series",
        image: "/assets/stelvio/rear_bumper_p_series_stelvio_alfa-1638291305482_v-1638291306.jpg",
        slug: "s-rear-bumper-p-series",
      },
      {
        title: "Front Suspension Control Arms",
        image: "/assets/stelvio/front_suspension_control_arms_stelvio_alfa-1638291446056_v-1638291446.jpg",
        slug: "s-front-suspension-control-arms",
      },
      {
        title: "Front Suspension Shocks and Springs",
        image: "/assets/stelvio/front_suspension_shocks_springs_stelvio_alfa-1638291488060_v-1638291489.jpg",
        slug: "s-front-suspension-shocks-and-springs",
      },
      {
        title: "Rear Suspension",
        image: "/assets/stelvio/rear_suspension_stelvio_alfa-1638291528470_v-1638291529.jpg",
        slug: "s-rear-suspension",
      },
      {
        title: "Rear Suspension Crossmember",
        image: "/assets/stelvio/rear_suspension_crossmember_stelvio_alfa-1638291571127_v-1638291572.jpg",
        slug: "s-rear-suspension-crossmember",
      },
      {
        title: "Headlights",
        image: "/assets/stelvio/headlights_stelvio_alfa-1638291610525_v-1638291611.jpg",
        slug: "s-headlights",
      },
      {
        title: "Taillights",
        image: "/assets/stelvio/taillights_stelvio_alfa-1638291644852_v-1638291645.jpg",
        slug: "s-taillights",
      },
      {
        title: "Front Brakes",
        image: "/assets/stelvio/front_brakes_stelvio_alfa-1638291696041_v-1638291697.jpg",
        slug: "s-front-brakes",
      },
      {
        title: "Rear Brakes",
        image: "/assets/stelvio/rear_brakes_stelvio_alfa-1638291728373_v-1638291729.jpg",
        slug: "s-rear-brakes",
      },
      {
        title: "Hood Hinge Prop",
        image: "/assets/stelvio/hood_hinge_stelvio_alfa_romeo1637647761522-1642449424449_v-1642449425.jpg",
        slug: "s-hood-hinge-prop",
      },
      {
        title: "Fenders",
        image: "/assets/stelvio/fenders_stelvio_alfa_romeo1637647761522-1642618950908_v-1642618952.jpg",
        slug: "s-fenders",
      },
      {
        title: "Door Lock Cylinders",
        image: "/assets/guilia/door_lock_clylinders_giulia_alfa_romeo1637647761522-1643740966889.webp",
        slug: "s-door-lock-cylinders",
      },
      {
        title: "Aperture Panel",
        image: "/assets/stelvio/aperture_panel_stelvio_alfa_romeo1637647761522-1642618659220_v-1642618660.jpg",
        slug: "s-aperture-panel",
      },
      {
        title: "Front Door Shell and Hinges",
        image: "/assets/guilia/front_door_shell_giulia_alfa_romeo1637647761522-1643741091556.webp",
        slug: "s-front-door-shell-and-hinges",
      },
      {
        title: "Rear Door Shell and Hinges",
        image: "/assets/guilia/rear_door_shell_giulia_alfa_romeo1637647761522-1643741188151.webp",
        slug: "s-rear-door-shell-and-hinges",
      },
      // ...add more parts 
    ]
  }



  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="relative bg-primary text-white py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <Button variant="outline" className="mb-8 text-gray-500 hover:text-primary" onClick={() => router.push("/")}>
            ← ALL ALFA ROMEO REPLACEMENT PARTS
          </Button>

          <h1 className="text-4xl font-bold mb-4">Alfa Romeo {params.model}</h1>
          <h2 className="text-5xl font-bold mb-8">Replacement Parts By Diagram</h2>

          <div className="text-center mt-12">
            <p className="text-xl mb-4">Know what parts you're looking for or have a question?</p>
            <div className="flex justify-center gap-4">
              <Button variant="secondary">Call Us</Button>
              <Button variant="secondary">Email Us</Button>
            </div>
            <div className="flex justify-center gap-8 mt-4">
              <p>408.something</p>
              <p>Store Email</p>
            </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl font-bold">
            {params.year} Alfa Romeo {params.model}
          </h3>
          <div className="relative w-48 h-28">
            <Image
              src={imageSrc}
              alt={`${params.year} Alfa Romeo ${params.model}`}
              fill
              className="object-contain"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {parts.map((part) => (
            <PartCard key={part.title} title={part.title} image={part.image} year={params.year} model={params.model} />
          ))}
        </div>
      </main>
    </div>
  )
}

