import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4">
      <h1 className="text-4xl font-bold mb-4">404 – Page not found</h1>
      <p className="text-lg mb-6 text-center max-w-md">
        The page you are looking for doesn&apos;t exist or may have been moved.
      </p>
      <Link
        href="/"
        className="px-4 py-2 rounded-md border text-sm font-medium hover:bg-gray-100"
      >
        Go back home
      </Link>
    </main>
  );
}
