export interface Service {
  slug: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  benefits: string[];
  process: string[];
  image: string;
  relatedProjects?: string[]; // Optional, slugs of related projects
}

export const services: Service[] = [
  {
    slug: "pengembangan-website",
    title: "Pengembangan Website",
    shortDescription: "Kami membangun website modern, responsif, dan cepat yang disesuaikan dengan kebutuhan bisnis Anda.",
    longDescription: `
      Di era digital ini, website adalah wajah bisnis Anda. Kami menawarkan layanan pengembangan website yang komprehensif, mulai dari desain UI/UX yang intuitif hingga implementasi back-end yang kokoh. Kami fokus pada performa, keamanan, dan pengalaman pengguna yang optimal.

      **Layanan Kami Meliputi:**
      *   **Website Perusahaan:** Profil perusahaan yang profesional dan informatif.
      *   **E-commerce:** Toko online yang aman dan mudah digunakan untuk menjual produk Anda.
      *   **Web Aplikasi Kustom:** Solusi web yang dirancang khusus untuk kebutuhan bisnis unik Anda.
      *   **Landing Page:** Halaman arahan yang efektif untuk kampanye pemasaran.
    `,
    benefits: [
      "Meningkatkan kredibilitas dan jangkauan bisnis.",
      "Meningkatkan interaksi dengan pelanggan.",
      "Mempermudah proses bisnis melalui otomatisasi.",
      "Desain responsif untuk semua perangkat.",
      "SEO-friendly untuk visibilitas yang lebih baik."
    ],
    process: [
      "**Discovery & Perencanaan:** Memahami kebutuhan dan tujuan bisnis Anda.",
      "**Desain UI/UX:** Membuat wireframe, mockup, dan prototipe yang menarik.",
      "**Pengembangan:** Mengubah desain menjadi kode fungsional.",
      "**Pengujian:** Memastikan website bebas bug dan berfungsi optimal.",
      "**Deployment & Peluncuran:** Membantu Anda meluncurkan website.",
      "**Pemeliharaan & Dukungan:** Memberikan dukungan pasca-peluncuran."
    ],
    image: "/images/gambar-hero.png", // Using existing image for now
    relatedProjects: ["pupr"], // Example related project slug
  },
  // Tambahkan layanan lain di sini
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find(service => service.slug === slug);
}

export function getAllServiceSlugs(): { slug: string }[] {
  return services.map(service => ({ slug: service.slug }));
}