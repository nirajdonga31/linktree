import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#d2f801] font-sans">
      {/* Navbar */}
      <div className="px-6 py-4">
        <nav className="bg-white rounded-full px-6 py-3 flex items-center justify-between max-w-6xl mx-auto shadow-sm">
          <div className="text-2xl font-bold text-[#1a1a1a] tracking-tight">Linktree</div>
          <div className="hidden lg:flex items-center gap-8 text-[15px] font-semibold text-[#1a1a1a]">
            <a href="#" className="hover:opacity-70 transition">Products</a>
            <a href="#" className="hover:opacity-70 transition">Templates</a>
            <a href="#" className="hover:opacity-70 transition">Marketplace</a>
            <a href="#" className="hover:opacity-70 transition">Learn</a>
            <a href="#" className="hover:opacity-70 transition">Pricing</a>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-[#1a1a1a] hover:opacity-70 font-semibold text-[15px] px-4 py-2">
              Log in
            </Link>
            <Link 
              href="/login" 
              className="bg-[#1a1a1a] text-white px-6 py-2.5 rounded-full font-bold text-[15px] hover:bg-black transition"
            >
              Sign up free
            </Link>
          </div>
        </nav>
      </div>

      {/* Hero */}
      <main className="px-6 pt-8 pb-16 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Left - Content */}
          <div className="pt-8">
            <h1 className="text-[56px] leading-[1.05] font-bold text-[#1a1a1a] mb-6 tracking-tight">
              A link in bio
              <br />
              built for you.
            </h1>
            
            <p className="text-[18px] leading-[1.5] text-[#1a1a1a] mb-8 max-w-lg">
              Join 70M+ people using Linktree for their link in bio. One link to help you 
              share everything you create, curate and sell from your Instagram, TikTok, 
              Twitter, YouTube and other social media profiles.
            </p>

            {/* Sign up form */}
            <div className="flex flex-col sm:flex-row gap-3 max-w-md">
              <div className="flex-1 bg-white rounded-full px-5 py-3.5 flex items-center border-2 border-[#e5e5e5] focus-within:border-[#1a1a1a] transition shadow-sm">
                <span className="text-[#666] font-semibold text-[16px]">linktr.ee/</span>
                <input 
                  type="text" 
                  placeholder="yourname"
                  className="flex-1 outline-none bg-transparent ml-1 text-[#1a1a1a] font-semibold text-[16px] placeholder:text-[#999]"
                />
              </div>
              <Link 
                href="/login" 
                className="bg-[#1a1a1a] text-white px-6 py-3.5 rounded-full font-bold text-[16px] hover:bg-black transition whitespace-nowrap text-center"
              >
                Get started for free
              </Link>
            </div>
          </div>

          {/* Right - Images */}
          <div className="space-y-4">
            {/* Main Hero Image */}
            <div className="relative">
              <img 
                src="https://cdn.prod.website-files.com/666255f7f2126f4e8cec6f8f/6807dbf51f83cd18cb3e01b3_Frame%201597880777.avif" 
                alt="Linktree Preview"
                className="w-full rounded-2xl shadow-lg"
              />
            </div>
            
            {/* Secondary Image */}
            <div className="relative">
              <img 
                src="https://cdn.prod.website-files.com/666255f7f2126f4e8cec6f8f/6807e1c17be10a663716dbd5_Frame%201197145639%20(1).avif" 
                alt="Creator Example"
                className="w-full rounded-2xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </main>

      {/* Logos Section */}
      <section className="bg-[#d2f801] py-12 border-t border-[#1a1a1a]/10">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-center text-[#1a1a1a] font-semibold mb-8 text-sm">Used by the world's biggest creators and brands</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-80">
            <img src="https://cdn.prod.website-files.com/666255f7f2126f4e8cec6f8f/66634cb2449d48431e9377ba_selena-gomez.webp" alt="Selena Gomez" className="h-8 w-auto" />
            <img src="https://cdn.prod.website-files.com/666255f7f2126f4e8cec6f8f/66634cb2449d48431e9377da_tonyhawk.webp" alt="Tony Hawk" className="h-8 w-auto" />
            <img src="https://cdn.prod.website-files.com/666255f7f2126f4e8cec6f8f/66634cb2449d48431e9377ac_comedy-central.webp" alt="Comedy Central" className="h-8 w-auto" />
            <img src="https://cdn.prod.website-files.com/666255f7f2126f4e8cec6f8f/66634cb2449d48431e937809_hbo.webp" alt="HBO" className="h-8 w-auto" />
            <img src="https://cdn.prod.website-files.com/666255f7f2126f4e8cec6f8f/66634cb1449d48431e937716_laclippers.webp" alt="LA Clippers" className="h-8 w-auto" />
          </div>
        </div>
      </section>

      {/* Feature 1 */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-[40px] font-bold text-[#1a1a1a] mb-4 leading-tight">
              Create and customize your Linktree in minutes
            </h2>
            <p className="text-[18px] text-[#1a1a1a] leading-relaxed">
              Connect all your content across social media, websites, stores and more in one link in bio. 
              Customize every detail or let Linktree automatically enhance it to match your brand and drive more clicks.
            </p>
            <Link 
              href="/login" 
              className="inline-block mt-6 bg-[#1a1a1a] text-white px-6 py-3 rounded-full font-bold hover:bg-black transition"
            >
              Get started for free
            </Link>
          </div>
          <div>
            <img 
              src="https://cdn.prod.website-files.com/666255f7f2126f4e8cec6f8f/680c13b834d3994a796896bd_all%20your%20things.avif" 
              alt="All your things"
              className="w-full rounded-2xl"
            />
          </div>
        </div>
      </section>

      {/* Feature 2 */}
      <section className="bg-[#1a1a1a] py-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <img 
              src="https://cdn.prod.website-files.com/666255f7f2126f4e8cec6f8f/680c16a391a7e027f3fbda59_products.avif" 
              alt="Products"
              className="w-full rounded-2xl"
            />
          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-[40px] font-bold text-white mb-4 leading-tight">
              Share your Linktree anywhere you like!
            </h2>
            <p className="text-[18px] text-gray-300 leading-relaxed">
              Add your unique Linktree URL to all the platforms and places you find your audience. 
              Then use your QR code to drive your offline traffic back to your link in bio.
            </p>
            <Link 
              href="/login" 
              className="inline-block mt-6 bg-white text-[#1a1a1a] px-6 py-3 rounded-full font-bold hover:bg-gray-100 transition"
            >
              Get started for free
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-[32px] font-bold text-[#1a1a1a] mb-12 text-center">As featured in...</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-[#f5f5f5] p-6 rounded-2xl">
              <p className="text-[#1a1a1a] font-medium mb-4">"Linktree simplifies the process for creators to share multiple parts of themselves in one inclusive link."</p>
              <div className="flex items-center gap-3">
                <img src="https://cdn.prod.website-files.com/666255f7f2126f4e8cec6f8f/66864533566fcb42ef955aad_Testimonial-Riley-Lemon.webp" alt="Riley Lemon" className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <p className="font-bold text-[#1a1a1a] text-sm">Riley Lemon</p>
                  <p className="text-gray-500 text-sm">Youtuber, Content Creator</p>
                </div>
              </div>
            </div>
            
            <div className="bg-[#f5f5f5] p-6 rounded-2xl">
              <p className="text-[#1a1a1a] font-medium mb-4">"Linktree helps my customers get where they need to go. It's fast and easy."</p>
              <div className="flex items-center gap-3">
                <img src="https://cdn.prod.website-files.com/666255f7f2126f4e8cec6f8f/66864534504211c47030e6cb_Testimonial-Patti-Chimkire-New.webp" alt="Patti Chimkire" className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <p className="font-bold text-[#1a1a1a] text-sm">Patti Chimkire</p>
                  <p className="text-gray-500 text-sm">Founder and Pastry Chef, Mali Bakes</p>
                </div>
              </div>
            </div>
            
            <div className="bg-[#f5f5f5] p-6 rounded-2xl">
              <p className="text-[#1a1a1a] font-medium mb-4">"I use Linktree's analytics to better understand my audience and what converts them."</p>
              <div className="flex items-center gap-3">
                <img src="https://cdn.prod.website-files.com/666255f7f2126f4e8cec6f8f/668645339d6bfad6723a29c2_Testimonial-Luke-Kidgell2.webp" alt="Luke Kidgell" className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <p className="font-bold text-[#1a1a1a] text-sm">Luke Kidgell</p>
                  <p className="text-gray-500 text-sm">Comedian</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1a1a1a] py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-2xl font-bold text-white mb-8">Linktree</div>
          <div className="grid md:grid-cols-4 gap-8 text-sm">
            <div>
              <h4 className="font-bold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">About</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
                <li><a href="#" className="hover:text-white">Press</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Community</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Linktree for Enterprise</a></li>
                <li><a href="#" className="hover:text-white">Creator Report</a></li>
                <li><a href="#" className="hover:text-white">Templates</a></li>
                <li><a href="#" className="hover:text-white">Explore</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Help Topics</a></li>
                <li><a href="#" className="hover:text-white">Getting Started</a></li>
                <li><a href="#" className="hover:text-white">Linktree Pro</a></li>
                <li><a href="#" className="hover:text-white">Features & How-Tos</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Trust & Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white">Cookie Preferences</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800 text-gray-500 text-sm">
            © 2024 Linktree Clone. Built for educational purposes.
          </div>
        </div>
      </footer>
    </div>
  );
}
