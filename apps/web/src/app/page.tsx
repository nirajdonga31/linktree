import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#d2f801]">
      {/* Navbar */}
      <div className="px-6 py-4">
        <nav className="bg-white rounded-full px-6 py-3 flex items-center justify-between max-w-6xl mx-auto shadow-sm">
          <div className="text-2xl font-bold text-[#1a1a1a]">Linktree</div>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-700">
            <a href="#" className="hover:text-black">Products</a>
            <a href="#" className="hover:text-black">Templates</a>
            <a href="#" className="hover:text-black">Marketplace</a>
            <a href="#" className="hover:text-black">Learn</a>
            <a href="#" className="hover:text-black">Pricing</a>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-gray-700 hover:text-black font-medium">
              Log in
            </Link>
            <Link 
              href="/login" 
              className="bg-[#1a1a1a] text-white px-5 py-2.5 rounded-full font-semibold hover:bg-black transition"
            >
              Sign up free
            </Link>
          </div>
        </nav>
      </div>

      {/* Hero */}
      <main className="px-6 pt-12 pb-20 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Content */}
          <div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#1a1a1a] mb-6 leading-[1.1]">
              A link in bio
              <br />
              built for you.
            </h1>
            
            <p className="text-lg text-gray-800 mb-8 max-w-lg">
              Join 70M+ people using Linktree for their link in bio. One link to help you 
              share everything you create, curate and sell from your Instagram, TikTok, 
              Twitter, YouTube and other social media profiles.
            </p>

            {/* Sign up form */}
            <div className="flex flex-col sm:flex-row gap-3 max-w-md">
              <div className="flex-1 bg-white rounded-full px-5 py-3 flex items-center border-2 border-transparent focus-within:border-[#1a1a1a] transition">
                <span className="text-gray-500 font-medium">linktr.ee/</span>
                <input 
                  type="text" 
                  placeholder="yourname"
                  className="flex-1 outline-none bg-transparent ml-1 text-[#1a1a1a] font-medium"
                />
              </div>
              <Link 
                href="/login" 
                className="bg-[#1a1a1a] text-white px-6 py-3 rounded-full font-bold hover:bg-black transition whitespace-nowrap"
              >
                Get started for free
              </Link>
            </div>
          </div>

          {/* Right - Images */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-4 shadow-lg">
              <div className="bg-[#8B4513] rounded-2xl p-6 text-white relative overflow-hidden">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-2xl">🎙️</div>
                  <div>
                    <p className="font-bold">Perfect Person</p>
                    <p className="text-sm text-white/70">Miles Bon, Host</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="bg-white/10 rounded-lg p-3 text-center">🎧 Listen on Spotify</div>
                  <div className="bg-white/10 rounded-lg p-3 text-center">🍎 Apple Podcasts</div>
                  <div className="bg-white/10 rounded-lg p-3 text-center">📺 YouTube</div>
                </div>
              </div>
            </div>
            
            <div className="bg-[#4a90d9] rounded-3xl p-6 text-white">
              <p className="text-2xl font-bold mb-2">Share your Linktree anywhere!</p>
              <p className="text-white/80">Add your unique Linktree URL to all your platforms.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
