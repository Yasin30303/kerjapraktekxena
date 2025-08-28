"use client"

import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building, Users, Target, ChevronLeft, ChevronRight } from "lucide-react";

const services = [
  {
    icon: <Building className="h-10 w-10 text-blue-600" />,
    title: "Aplikasi & TI",
    description: "Pengembangan aplikasi dan solusi teknologi informasi khusus yang disesuaikan untuk memenuhi kebutuhan bisnis Anda.",
  },
  {
    icon: <Users className="h-10 w-10 text-blue-600" />,
    title: "Perangkat Keras & Lunak",
    description: "Penyediaan perangkat keras dan lunak yang berhubungan dengan teknologi informasi, untuk mendukung berbagai kebutuhan bisnis.",
  },
  {
    icon: <Target className="h-10 w-10 text-blue-600" />,
    title: "Pemeliharaan Sistem",
    description: "Layanan pemeliharaan dan dukungan teknis untuk sistem teknologi informasi agar tetap optimal untuk kebutuhan Anda.",
  },
  {
    icon: <Building className="h-10 w-10 text-blue-600" />,
    title: "Konsultasi IT",
    description: "Memberikan saran ahli dan strategi untuk mengoptimalkan infrastruktur dan proses IT bisnis Anda.",
  },
  {
    icon: <Users className="h-10 w-10 text-blue-600" />,
    title: "Keamanan Siber",
    description: "Melindungi data dan sistem Anda dari ancaman siber dengan solusi keamanan terkini.",
  },
];

export function ServicesCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'center', // Align slides to center
    dragFree: false, // Snap to slides
    containScroll: 'trimSnaps',
  });

  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback((emblaApi: any) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect(emblaApi);
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section id="pelayanan" className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Pelayanan Kami</h2>
        <div className="relative">
          <div className="overflow-hidden rounded-xl shadow-xl" ref={emblaRef}>
            <div className="flex -ml-4">
              {services.map((service, index) => (
                <div 
                  key={index} 
                  className="flex-shrink-0 pl-4 w-full sm:w-2/3 lg:w-1/2"
                  style={{
                    transform: `scale(${selectedIndex === index ? 1 : 0.9})`,
                    opacity: selectedIndex === index ? 1 : 0.5,
                    transition: 'transform 0.5s ease-in-out, opacity 0.5s ease-in-out',
                  }}
                >
                  <Card className="text-center shadow-md hover:shadow-lg transition-shadow h-full rounded-lg">
                    <CardHeader>
                      <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                        {service.icon}
                      </div>
                      <CardTitle>{service.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">{service.description}</p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          <button 
            onClick={scrollPrev} 
            disabled={!prevBtnEnabled}
            className="absolute top-1/2 left-0 transform -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:bg-blue-700 transition z-10 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button 
            onClick={scrollNext} 
            disabled={!nextBtnEnabled}
            className="absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:bg-blue-700 transition z-10 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      </div>
    </section>
  );
}
