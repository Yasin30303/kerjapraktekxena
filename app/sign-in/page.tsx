"use client";

import { SignIn } from "@clerk/nextjs";
import Image from "next/image";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-blue-900 p-6">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
        {/* Logo + Title */}
        <div className="flex flex-col items-center mb-6">
          <Image
            src="/images/logo-perusahaan.png"
            alt="XENA TEKNO Logo"
            width={60}
            height={60}
          />
          <h1 className="text-2xl font-bold text-gray-800 mt-4">XENA TEKNO</h1>
          <p className="text-gray-500 text-sm mt-1">
            Masuk untuk mengakses Dashboard Admin
          </p>
        </div>

        {/* Clerk Sign In Component */}
        <SignIn
          appearance={{
            elements: {
              formButtonPrimary:
                "bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg",
              card: "shadow-none",
            },
          }}
          routing="path"
          path="/sign-in"
        />
      </div>
    </div>
  );
}
