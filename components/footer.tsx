"use client";

import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-blue-800 text-white py-12 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <Image
              src="/images/logo-perusahaan.png"
              alt="XENA TEKNO Logo"
              width={32}
              height={32}
            />
            <h3 className="text-lg font-bold">XENA TEKNO</h3>
          </div>
          <p className="text-blue-200 text-sm">
            Solusi teknologi terdepan untuk transformasi digital perusahaan
            Anda.
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Layanan</h4>
          <ul className="space-y-2 text-sm text-blue-200">
            <li>Sistem Informasi Manajemen</li>
            <li>Aplikasi Web & Mobile</li>
            <li>Konsultasi IT</li>
            <li>Maintenance & Support</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Perusahaan</h4>
          <ul className="space-y-2 text-sm text-blue-200">
            <li>Tentang Kami</li>
            <li>Karir</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Kontak</h4>
          <ul className="space-y-2 text-sm text-blue-200">
            <li>+62 21 1234 5678</li>
            <li>info@xenatekno.com</li>
            <li>Bandung, Indonesia</li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-blue-700 text-center text-sm text-blue-200">
        <p>&copy; 2025 XENA TEKNO. All rights reserved.</p>
      </div>
    </footer>
  );
}
