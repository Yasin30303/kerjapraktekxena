"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

export default function HubungiKami() {
  const [formData, setFormData] = useState({
    namaLengkap: "",
    namaPerusahaan: "",
    email: "",
    nomorHandphone: "",
    pertanyaan: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      alert("Terima kasih! Pesan Anda sudah terkirim ke email kami.");
      setFormData({
        namaLengkap: "",
        namaPerusahaan: "",
        email: "",
        nomorHandphone: "",
        pertanyaan: "",
      });
    } else {
      alert("Gagal mengirim pesan. Silakan coba lagi.");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="bg-blue-600 text-white py-4 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="/images/logo-perusahaan.png"
              alt="XENA TEKNO Logo"
              width={40}
              height={40}
            />
            <h1 className="text-xl font-bold">XENA TEKNO</h1>
          </div>
          <nav className="flex gap-6">
            <Link href="/" className="hover:text-blue-200 transition-colors">
              Tentang Kami
            </Link>
            <a
              href="/#pelayanan"
              className="hover:text-blue-200 transition-colors"
            >
              Pelayanan
            </a>
            <a
              href="/#kontak"
              className="hover:text-blue-200 transition-colors"
            >
              Kontak
            </a>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow py-12 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Judul rata tengah */}
          <h1 className="text-2xl font-bold text-center mb-12 text-gray-800">
            Hubungi Kami
          </h1>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Kiri = deskripsi */}
            <div>
              <p className="text-gray-600 leading-relaxed text-lg">
                Mulailah berkolaborasi dengan XENA TEKNO dengan mengisi formulir
                ini. Tim kami akan segera menanggapi pertanyaan Anda dalam waktu
                1x24 jam kerja.
              </p>
            </div>

            {/* Kanan = form */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-gray-800">
                    Kirim Pesan
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label
                        htmlFor="namaLengkap"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Nama Lengkap
                      </label>
                      <Input
                        id="namaLengkap"
                        name="namaLengkap"
                        type="text"
                        required
                        value={formData.namaLengkap}
                        onChange={handleChange}
                        className="w-full"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="namaPerusahaan"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Nama Perusahaan
                      </label>
                      <Input
                        id="namaPerusahaan"
                        name="namaPerusahaan"
                        type="text"
                        value={formData.namaPerusahaan}
                        onChange={handleChange}
                        className="w-full"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Email
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="nomorHandphone"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Nomor Handphone
                      </label>
                      <Input
                        id="nomorHandphone"
                        name="nomorHandphone"
                        type="tel"
                        required
                        value={formData.nomorHandphone}
                        onChange={handleChange}
                        className="w-full"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="pertanyaan"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Pertanyaan/Permintaan *
                      </label>
                      <Textarea
                        id="pertanyaan"
                        name="pertanyaan"
                        required
                        rows={5}
                        placeholder="Beritahu kami masalah perusahaan anda"
                        value={formData.pertanyaan}
                        onChange={handleChange}
                        className="w-full"
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
                      size="lg"
                    >
                      Kirim
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-blue-800 text-white py-12 px-6 mt-16">
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
              <li>+62 838-2158-7222</li>
              <li>info@xenatekno.com</li>
              <li>Bandung, Indonesia</li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-blue-700 text-center text-sm text-blue-200">
          <p>&copy; 2025 XENA TEKNO. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
