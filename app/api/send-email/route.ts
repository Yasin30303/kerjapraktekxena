import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Buat transporter pakai SMTP
    const transporter = nodemailer.createTransport({
      service: "gmail", // bisa juga pakai smtp.office365, smtp.mailgun, dll.
      auth: {
        user: process.env.EMAIL_USER, // email perusahaan
        pass: process.env.EMAIL_PASS, // password atau app password
      },
    });

    // Atur isi email
    await transporter.sendMail({
      from: `"XENA TEKNO Website" <${process.env.EMAIL_USER}>`,
      to: "xenatekno@gmail.com", // email tujuan perusahaan
      subject: "Pesan Baru dari Form Hubungi Kami",
      text: `
        Nama Lengkap: ${body.namaLengkap}
        Nama Perusahaan: ${body.namaPerusahaan}
        Email: ${body.email}
        Nomor HP: ${body.nomorHandphone}
        Pertanyaan: ${body.pertanyaan}
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email error:", error);
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
