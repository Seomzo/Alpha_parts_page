import Header from "@/components/header"
import CarModelCard from "@/components/car-model-card"

export default function Home() {
  const models = [
    {
      model: "Giulia",
      image: "/assets/guilia/giulia.png",
      years: [2018, 2019, 2020, 2021, 2022],
    },
    {
      model: "Stelvio",
      image:
        "/assets/stelvio/boutique_replacement_parent_column_stelvio_icon-1638290406765_v-1638290407.png",
      years: [2018, 2019, 2020, 2021, 2022],
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {models.map((model) => (
            <CarModelCard key={model.model} model={model.model} image={model.image} years={model.years} />
          ))}
        </div>
      </main>
    </div>
  )
}

