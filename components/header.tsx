"use client";

import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white text-black py-4 px-6 border-b border-gray-200">
      <div className="mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image
            src="/images/logo-perusahaan.png"
            alt="XENA TEKNO Logo"
            width={40}
            height={40}
            //className="bg-white rounded-full p-1"
          />
          <h1 className="text-xl font-bold">XENA TEKNO</h1>
        </div>
        <nav className="flex gap-6">
          <a href="#tentang" className="hover:text-blue-200 transition-colors">
            Tentang Kami
          </a>
          <a
            href="#pelayanan"
            className="hover:text-blue-200 transition-colors"
          >
            Pelayanan
          </a>
          <a href="/blog" className="hover:text-blue-200 transition-colors">
            Blog
          </a>
          <a href="#kontak" className="hover:text-blue-200 transition-colors">
            Kontak
          </a>
        </nav>
      </div>
    </header>
  );
}
