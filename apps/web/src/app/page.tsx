import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-500 to-pink-500 flex flex-col items-center justify-center p-8 text-white">
      <div className="text-center max-w-md">
        <h1 className="text-5xl font-bold mb-4 tracking-tight">Linktree</h1>
        <p className="text-xl mb-8 text-white/90">The only link you'll ever need</p>
        <Link
          href="/login"
          className="inline-block px-8 py-4 bg-white text-purple-600 rounded-full font-semibold text-lg hover:bg-white/90 transition shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          Get Started for Free
        </Link>
        <p className="mt-6 text-sm text-white/70">
          Join 50M+ creators and brands
        </p>
      </div>
    </main>
  );
}
