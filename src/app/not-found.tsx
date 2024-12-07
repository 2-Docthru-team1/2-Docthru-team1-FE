import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-beige">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-[5rem] text-primary-blue">404</h1>
        <p className="mt-4 text-[2rem] text-gray-700">Page not found.</p>
        <p className="mt-2 text-[1.6rem] text-gray-500">The page you are looking for does not exist.</p>
        <div className="mt-6">
          <Link href="/" className="px-6 py-3 text-primary-white text-[1.5rem] bg-primary-blue rounded-lg hover:bg-blue-700">
            Go back home
          </Link>
        </div>
      </div>
    </div>
  );
}
