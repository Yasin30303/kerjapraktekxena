// components/ContactContent.tsx

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ContactContent() {
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
    <div className="max-w-7xl mx-auto py-12 px-6">
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
                {/* ... (input fields dan button) ... */}
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
  );
}
