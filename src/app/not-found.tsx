import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <span className="badge">404</span>
        <h1 className="mt-3 text-3xl font-bold text-navy-900">
          Page not found
        </h1>
        <p className="mt-2 text-charcoal-600">
          The page you were looking for doesn't exist or has moved.
        </p>
        <Link href="/" className="btn-primary mt-6 inline-flex">
          Back to home
        </Link>
      </div>
    </div>
  );
}
