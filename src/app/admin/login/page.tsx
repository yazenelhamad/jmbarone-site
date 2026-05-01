import { LoginForm } from "./LoginForm";
import { Logo } from "@/components/Logo";
import Link from "next/link";

export const metadata = {
  title: "Admin Login",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-charcoal-50/40 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-6">
          <Logo />
        </div>
        <div className="card p-8">
          <h1 className="text-2xl font-bold text-navy-900">Admin Sign In</h1>
          <p className="mt-1 text-sm text-charcoal-600">
            Sign in to manage site content.
          </p>
          <div className="mt-6">
            <LoginForm />
          </div>
        </div>
        <div className="mt-6 text-center text-sm text-charcoal-500">
          <Link href="/" className="hover:text-navy-700">
            ← Back to website
          </Link>
        </div>
      </div>
    </div>
  );
}
