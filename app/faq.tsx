"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "Apa saja layanan utama yang ditawarkan oleh XENA TEKNO?",
    answer:
      "Kami fokus pada tiga layanan utama: pengembangan aplikasi & teknologi informasi, pengadaan perangkat keras & lunak, serta layanan pemeliharaan sistem untuk memastikan solusi teknologi Anda berjalan optimal.",
  },
  {
    question: "Bagaimana proses untuk memulai proyek dengan XENA TEKNO?",
    answer:
      "Prosesnya mudah. Anda bisa menghubungi kami melalui formulir kontak di situs ini atau melalui email. Tim kami akan segera menjadwalkan sesi konsultasi untuk memahami kebutuhan Anda dan mengajukan proposal.",
  },
  {
    question: "Berapa lama waktu yang dibutuhkan untuk mengembangkan sebuah aplikasi?",
    answer:
      "Waktu pengembangan sangat bervariasi tergantung pada kompleksitas dan fitur yang dibutuhkan. Setelah diskusi awal, kami akan memberikan estimasi waktu pengerjaan yang lebih akurat dalam proposal kami.",
  },
  {
    question: "Apakah XENA TEKNO menyediakan dukungan setelah proyek selesai?",
    answer:
      "Tentu saja. Kami menyediakan paket layanan pemeliharaan dan dukungan teknis untuk memastikan aplikasi atau sistem Anda tetap berjalan lancar dan aman setelah diluncurkan.",
  },
]

export function FaqSection() {
  return (
    <section id="faq" className="py-20 px-6 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          Pertanyaan yang Sering Diajukan (FAQ)
        </h2>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem value={`item-${index + 1}`} key={index}>
              <AccordionTrigger className="text-left font-semibold">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
