"use client";
import { VideoText } from "@/components/magicui/video-text";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { FaqSection } from "@/app/faq";
import { ProjectGallery } from "@/app/project-gallery";
import { ModernServicesCarousel } from "@/components/modern-services-carousel";
import { MotionDiv } from "@/components/motion-div";
import { ScrollAnimatedSvg } from "@/components/scroll-animated-svg";

export default function HomeContent() {
  const [showVisiMisi, setShowVisiMisi] = useState(false);

  return (
    <>
      {/* Hero Section */}

      <div className="relative min-h-screen w-full bg-white overflow-hidden">
        {/* Latar Belakang Warna Diagonal */}
        <div className="absolute inset-0 flex">
          {/* Bagian kiri yang putih */}
          <div className="w-1/2" />
          {/* Container untuk 3 warna diagonal */}
          <div className="w-1/2 flex -skew-x-[25deg] translate-x-24">
            <div className="w-1/3 bg-[#F4B400]" /> {/* Kuning */}
            <div className="w-1/3 bg-[#4285F4]" /> {/* Biru */}
            <div className="w-1/3 bg-[#DB4437]" /> {/* Merah */}
          </div>
        </div>

        {/* Konten di Atas Latar Belakang */}
        <main className="relative z-10 grid grid-cols-2 min-h-[80vh] px-6">
          {/* Kolom Kiri: Logo dan Video */}
          <div className="flex flex-col justify-center mb-20">
            <div className="relative h-[190px] w-full ">
              <VideoText src="https://cdn.magicui.design/ocean-small.webm">
                XENA
              </VideoText>
              <VideoText src="https://cdn.magicui.design/ocean-small.webm">
                TEKNO
              </VideoText>
            </div>
          </div>

          {/* Kolom Kanan: Teks "Animation" */}
          <div className="flex items-center flex-col justify-center">
            <h1 className="text-black text-right text-5xl font-extrabold tracking-wide">
              Menghadirkan Solusi Lewat Teknologi
            </h1>
          </div>
        </main>
      </div>

      {/* Tentang Kami Section */}
      <section id="tentang" className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="flex justify-center">
            <Image
              src="/images/gambar-tentang.png"
              alt="Tentang Kami"
              width={400}
              height={300}
              className="max-w-full h-auto"
            />
          </div>
          <div>
            <MotionDiv>
              <h2 className="text-3xl font-bold mb-6 text-gray-800">
                Tentang Kami
              </h2>
            </MotionDiv>
            <MotionDiv delay={0.2}>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Kami mengembangkan teknologi untuk berbagai perusahaan, selain
                itu kami bergerak dalam bidang perdagangan barang dan jasa.
              </p>
            </MotionDiv>
            <Button
              onClick={() => setShowVisiMisi(true)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Selengkapnya
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Artistic Divider Section */}
      <section
        className="py-16 px-6 bg-gray-50"
        style={{ perspective: "1000px" }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <MotionDiv delay={0.1}>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Meningkatkan Bisnis Anda Melalui Inovasi
            </h2>
          </MotionDiv>
          <MotionDiv delay={0.3}>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Kami menggabungkan strategi, desain, dan teknologi untuk
              menciptakan solusi digital.
            </p>
          </MotionDiv>
          <MotionDiv delay={0.5}>
            <ScrollAnimatedSvg className="flex-shrink-0 max-w-full" />
          </MotionDiv>
        </div>
      </section>

      <MotionDiv>
        <ModernServicesCarousel />
      </MotionDiv>

      <MotionDiv>
        <ProjectGallery />
      </MotionDiv>

      <MotionDiv>
        <FaqSection />
      </MotionDiv>

      {/* Hubungi Kami Section */}
      <MotionDiv>
        <section id="kontak" className="py-20 px-6 bg-white text-black">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Hubungi Kami</h2>
            <p className="text-lg mb-8 text-gray-600">
              Hubungi Kami Untuk Mendapatkan Penawaran Terbaik
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Link href="/hubungi-kami">
                <Button
                  size="lg"
                  className="bg-blue-600 text-white hover:bg-blue-700"
                >
                  Hubungi Kami
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </MotionDiv>

      {/* Visi Misi Dialog */}
      <Dialog open={showVisiMisi} onOpenChange={setShowVisiMisi}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-800">
              Visi dan Misi
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <div>
              <p className="text-gray-600 leading-relaxed">
                Visi dan Misi kami adalah memberikan solusi terbaik bagi
                perusahaan melalui teknologi.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                Struktur Organisasi
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-600 mb-2">
                    Komisaris
                  </h4>
                  <p className="text-gray-700">Rey Mantovani Tarigan</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-600 mb-2">Direktur</h4>
                  <p className="text-gray-700">Faiza Fasha</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-600 mb-2">Teknisi</h4>
                  <p className="text-gray-700">Kasum</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-600 mb-2">Keuangan</h4>
                  <p className="text-gray-700">Dini Nur Salamah</p>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
