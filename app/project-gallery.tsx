"use client"

import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const projects = [
  {
    client: "PUPR",
    year: "2022",
    logo: "/images/logo-pupr.png",
    image: "/images/pupr.jpeg",
    services: [
      "Pemeliharaan Data",
      "Alat Audio Visual",
      "Pengadaan Laptop",
      "Lisensi Google Workspace",
    ],
  },
  {
    client: "Institut Teknologi Bandung",
    year: "2022",
    logo: "/images/logo-itb.png",
    image: "/images/itb.jpg",
    services: ["Pengadaan SSD Server", "Pembuatan Aplikasi", "Web Learning Outcome"],
  },
  {
    client: "Gunung Raja Paksi",
    year: "2022",
    logo: "/images/logo-gp.png",
    image: "/images/gp.jpeg",
    services: [
      "Kabel Data Server",
      "Processor Server",
    ],
  },
  {
    client: "Gunung Raja Paksi",
    year: "2023",
    logo: "/images/logo-gp.png",
    image: "/images/gp.jpeg",
    services: ["SSD Server", "Power Supply Server"],
  },
]

export function ProjectGallery() {
  return (
    <section id="projects" className="py-20 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Galeri Proyek Kami</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="rounded-xl shadow-md overflow-hidden transition-shadow duration-300 hover:shadow-lg">
              <div className="relative h-56 rounded-t-xl overflow-hidden"> {/* Image container */}
                <Image
                  src={project.image}
                  alt={`Proyek untuk ${project.client}`}
                  fill
                  className="object-cover" // No group-hover scale here, as it's on the card itself
                />
                <div className="absolute top-4 left-4"> {/* Added logo div */}
                  <Image
                    src={project.logo}
                    alt={`Logo ${project.client}`}
                    width={48}
                    height={48}
                    className="bg-white p-1 rounded-full shadow-md"
                  />
                </div>
              </div>
              <div className="p-4"> {/* Content area */}
                <h3 className="text-xl font-bold text-gray-900 mb-1">{project.client}</h3> {/* Title */}
                <p className="text-sm text-gray-500 mb-3">{project.year}</p> {/* Year */}
                <div className="flex flex-wrap gap-2">
                  {project.services.map((service, i) => (
                    <Badge key={i} variant="secondary">{service}</Badge>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}