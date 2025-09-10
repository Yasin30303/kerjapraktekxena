// app/rahasia-admin-login/page.tsx
import { SignIn } from "@clerk/nextjs";

export default function SecretLogin() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <SignIn path="/admin/login" routing="path" afterSignInUrl="/admin/blog" />
    </div>
  );
}
