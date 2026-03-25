import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-4">
        <div className="text-2xl font-bold tracking-tight">Linktree</div>
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-white hover:text-gray-300 transition">
            Log in
          </Link>
          <Link 
            href="/login" 
            className="bg-white text-black px-5 py-2.5 rounded-full font-semibold hover:bg-gray-100 transition"
          >
            Sign up free
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <main className="px-6 pt-16 pb-24 text-center max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          Everything you are.
          <br />
          <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
            In one simple link.
          </span>
        </h1>
        
        <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
          Join 70M+ people using Linktree for their link in bio. 
          One link to help you share everything you create, curate and sell.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/login" 
            className="bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 px-8 py-4 rounded-full font-bold text-lg hover:opacity-90 transition"
          >
            Get started for free
          </Link>
        </div>
      </main>

      {/* Features */}
      <section className="bg-[#111] py-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12">
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-600/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl">✨</span>
            </div>
            <h3 className="text-xl font-bold mb-3">Create and customize</h3>
            <p className="text-gray-400">Connect all your content across social media in one link in bio.</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-pink-600/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl">🔗</span>
            </div>
            <h3 className="text-xl font-bold mb-3">Share anywhere</h3>
            <p className="text-gray-400">Add your Linktree URL to all platforms and places you find your audience.</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-600/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl">📊</span>
            </div>
            <h3 className="text-xl font-bold mb-3">Analyze & grow</h3>
            <p className="text-gray-400">Track engagement, monitor revenue and learn what converts your audience.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0a0a0a] py-8 px-6 text-center text-gray-500">
        <p>© 2024 Linktree Clone. Built with ❤️</p>
      </footer>
    </div>
  );
}
