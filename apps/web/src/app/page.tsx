'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

function ScrollReveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      {children}
    </div>
  );
}

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
              Join 70M+ people using Linktree for their link in bio. One link to help you share everything you create, curate and sell from your Instagram, TikTok, Twitter, YouTube and other social media profiles.
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

          {/* Right - Images with scroll animation */}
          <div className="space-y-4">
            <ScrollReveal>
              <div className="relative">
                <img 
                  src="https://cdn.prod.website-files.com/666255f7f2126f4e8cec6f8f/6807dbf51f83cd18cb3e01b3_Frame%201597880777.avif" 
                  alt="Linktree Preview"
                  className="w-full rounded-2xl shadow-lg"
                />
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={200}>
              <div className="relative">
                <img 
                  src="https://cdn.prod.website-files.com/666255f7f2126f4e8cec6f8f/6807e1c17be10a663716dbd5_Frame%201197145639%20(1).avif" 
                  alt="Creator Example"
                  className="w-full rounded-2xl shadow-lg"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </main>

      {/* Logos Section */}
      <section className="bg-[#d2f801] py-12 border-t border-[#1a1a1a]/10">
        <ScrollReveal>
          <div className="max-w-6xl mx-auto px-6">
            <p className="text-center text-[#1a1a1a] font-semibold mb-8 text-sm">Used by the world's biggest creators and brands</p>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-80">
              <img src="https://cdn.prod.website-files.com/666255f7f2126f4e8cec6f8f/66634cb2449d48431e9377ba_selena-gomez.webp" alt="Selena Gomez" className="h-8 w-auto hover:scale-110 transition-transform" />
              <img src="https://cdn.prod.website-files.com/666255f7f2126f4e8cec6f8f/66634cb2449d48431e9377da_tonyhawk.webp" alt="Tony Hawk" className="h-8 w-auto hover:scale-110 transition-transform" />
              <img src="https://cdn.prod.website-files.com/666255f7f2126f4e8cec6f8f/66634cb2449d48431e9377ac_comedy-central.webp" alt="Comedy Central" className="h-8 w-auto hover:scale-110 transition-transform" />
              <img src="https://cdn.prod.website-files.com/666255f7f2126f4e8cec6f8f/66634cb2449d48431e937809_hbo.webp" alt="HBO" className="h-8 w-auto hover:scale-110 transition-transform" />
              <img src="https://cdn.prod.website-files.com/666255f7f2126f4e8cec6f8f/66634cb1449d48431e937716_laclippers.webp" alt="LA Clippers" className="h-8 w-auto hover:scale-110 transition-transform" />
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Feature 1 - White BG */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <ScrollReveal>
            <div>
              <h2 className="text-[40px] font-bold text-[#1a1a1a] mb-4 leading-tight">
                Create and customize your Linktree in minutes
              </h2>
              <p className="text-[18px] text-[#1a1a1a] leading-relaxed">
                Connect all your content across social media, websites, stores and more in one link in bio. Customize every detail or let Linktree automatically enhance it to match your brand and drive more clicks.
              </p>
              <Link 
                href="/login" 
                className="inline-block mt-6 bg-[#1a1a1a] text-white px-6 py-3 rounded-full font-bold hover:bg-black transition"
              >
                Get started for free
              </Link>
            </div>
          </ScrollReveal>
          
          <ScrollReveal delay={200}>
            <div className="hover:scale-[1.02] transition-transform duration-500">
              <img 
                src="https://cdn.prod.website-files.com/666255f7f2126f4e8cec6f8f/680c13b834d3994a796896bd_all%20your%20things.avif" 
                alt="All your things"
                className="w-full rounded-2xl"
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Feature 2 - Dark BG */}
      <section className="bg-[#1a1a1a] py-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <ScrollReveal delay={200}>
            <div className="hover:scale-[1.02] transition-transform duration-500">
              <img 
                src="https://cdn.prod.website-files.com/666255f7f2126f4e8cec6f8f/680c16a391a7e027f3fbda59_products.avif" 
                alt="Products"
                className="w-full rounded-2xl"
              />
            </div>
          </ScrollReveal>
          
          <ScrollReveal>
            <div>
              <h2 className="text-[40px] font-bold text-white mb-4 leading-tight">
                Share your Linktree anywhere you like!
              </h2>
              <p className="text-[18px] text-gray-300 leading-relaxed">
                Add your unique Linktree URL to all the platforms and places you find your audience. Then use your QR code to drive your offline traffic back to your link in bio.
              </p>
              <Link 
                href="/login" 
                className="inline-block mt-6 bg-white text-[#1a1a1a] px-6 py-3 rounded-full font-bold hover:bg-gray-100 transition"
              >
                Get started for free
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Feature 3 - White BG with Analytics Image */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <ScrollReveal>
            <div>
              <h2 className="text-[40px] font-bold text-[#1a1a1a] mb-4 leading-tight">
                Analyze your audience and keep them engaged
              </h2>
              <p className="text-[18px] text-[#1a1a1a] leading-relaxed">
                Track your engagement over time, monitor revenue and learn what's converting your audience. Make informed updates on the fly to keep them coming back.
              </p>
              <Link 
                href="/login" 
                className="inline-block mt-6 bg-[#1a1a1a] text-white px-6 py-3 rounded-full font-bold hover:bg-black transition"
              >
                Get started for free
              </Link>
            </div>
          </ScrollReveal>
          
          <ScrollReveal delay={200}>
            <div className="hover:scale-[1.02] transition-transform duration-500">
              <img 
                src="https://cdn.prod.website-files.com/666255f7f2126f4e8cec6f8f/6807e1c1a9eb09812121020a_Frame%201197145639%20(2).avif" 
                alt="Analytics"
                className="w-full rounded-2xl"
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Purple BG Section - New Image */}
      <section className="bg-[#7c5cff] py-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <ScrollReveal delay={200}>
            <div className="hover:scale-[1.02] transition-transform duration-500">
              <img 
                src="https://cdn.prod.website-files.com/666255f7f2126f4e8cec6f8f/68b80693934ab0ccd4bf7482_home-section-4.avif" 
                alt="Linktree Features"
                className="w-full rounded-2xl shadow-2xl"
              />
            </div>
          </ScrollReveal>
          
          <ScrollReveal>
            <div>
              <h2 className="text-[40px] font-bold text-white mb-4 leading-tight">
                Grow your following across all platforms
              </h2>
              <p className="text-[18px] text-white/90 leading-relaxed">
                Connect with your audience everywhere they are. From social media to email, your Linktree brings it all together in one beautiful link.
              </p>
              <Link 
                href="/login" 
                className="inline-block mt-6 bg-white text-[#7c5cff] px-6 py-3 rounded-full font-bold hover:bg-gray-100 transition"
              >
                Get started for free
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Pink BG Section - Another New Image */}
      <section className="bg-[#ff6b9d] py-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <ScrollReveal>
            <div>
              <h2 className="text-[40px] font-bold text-white mb-4 leading-tight">
                Monetize your content effortlessly
              </h2>
              <p className="text-[18px] text-white/90 leading-relaxed">
                Accept payments, sell products, and collect tips directly through your Linktree. Turn your followers into customers with built-in commerce tools.
              </p>
              <Link 
                href="/login" 
                className="inline-block mt-6 bg-white text-[#ff6b9d] px-6 py-3 rounded-full font-bold hover:bg-gray-100 transition"
              >
                Get started for free
              </Link>
            </div>
          </ScrollReveal>
          
          <ScrollReveal delay={200}>
            <div className="hover:scale-[1.02] transition-transform duration-500">
              <img 
                src="https://cdn.prod.website-files.com/666255f7f2126f4e8cec6f8f/68b80742d1d9216c45c6d6ea_group1597882005.avif" 
                alt="Monetization"
                className="w-full rounded-2xl shadow-2xl"
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Blue BG Section */}
      <section className="bg-[#4a90d9] py-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <ScrollReveal delay={200}>
            <div className="hover:scale-[1.02] transition-transform duration-500">
              <img 
                src="https://cdn.prod.website-files.com/666255f7f2126f4e8cec6f8f/6882edcf6915328005a76e24_frame1197145639.avif" 
                alt="Linktree for Business"
                className="w-full rounded-2xl shadow-2xl"
              />
            </div>
          </ScrollReveal>
          
          <ScrollReveal>
            <div>
              <h2 className="text-[40px] font-bold text-white mb-4 leading-tight">
                Trusted by millions of creators
              </h2>
              <p className="text-[18px] text-white/90 leading-relaxed">
                From influencers to entrepreneurs, podcasters to artists — Linktree is the link in bio tool that helps everyone share more.
              </p>
              <Link 
                href="/login" 
                className="inline-block mt-6 bg-white text-[#4a90d9] px-6 py-3 rounded-full font-bold hover:bg-gray-100 transition"
              >
                Get started for free
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* As Featured In - Press Logos */}
      <section className="bg-[#f5f5f5] py-16 px-6">
        <ScrollReveal>
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-[#1a1a1a] font-semibold mb-8">As featured in...</p>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-60">
              <img src="https://cdn.prod.website-files.com/666255f7f2126f4e8cec6f8f/68ccc14fd2540b94aa830d59_forbes-blue-grey.avif" alt="Forbes" className="h-8 w-auto" />
              <img src="https://cdn.prod.website-files.com/666255f7f2126f4e8cec6f8f/68ccc14fe75d954138be7db4_mashable_logo_(2021)1.avif" alt="Mashable" className="h-8 w-auto" />
              <img src="https://cdn.prod.website-files.com/666255f7f2126f4e8cec6f8f/68ccc14f97d207e420a58182_insiderlogo1.avif" alt="Insider" className="h-8 w-auto" />
              <img src="https://cdn.prod.website-files.com/666255f7f2126f4e8cec6f8f/68ccc14f1230aaa3bbd0a99a_entrepreneur-blue-grey__2_.avif" alt="Entrepreneur" className="h-8 w-auto" />
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Testimonials */}
      <section className="bg-white py-20 px-6 border-t border-gray-100">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <h2 className="text-[32px] font-bold text-[#1a1a1a] mb-12 text-center">As featured in...</h2>
          </ScrollReveal>
          
          <div className="grid md:grid-cols-3 gap-6">
            <ScrollReveal>
              <div className="bg-[#f5f5f5] p-6 rounded-2xl h-full">
                <p className="text-[#1a1a1a] font-medium mb-4">"Linktree simplifies the process for creators to share multiple parts of themselves in one inclusive link."</p>
                <div className="flex items-center gap-3">
                  <img src="https://cdn.prod.website-files.com/666255f7f2126f4e8cec6f8f/66864533566fcb42ef955aad_Testimonial-Riley-Lemon.webp" alt="Riley Lemon" className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <p className="font-bold text-[#1a1a1a] text-sm">Riley Lemon</p>
                    <p className="text-gray-500 text-sm">Youtuber, Content Creator</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={100}>
              <div className="bg-[#f5f5f5] p-6 rounded-2xl h-full">
                <p className="text-[#1a1a1a] font-medium mb-4">"Linktree helps my customers get where they need to go. It's fast and easy."</p>
                <div className="flex items-center gap-3">
                  <img src="https://cdn.prod.website-files.com/666255f7f2126f4e8cec6f8f/66864534504211c47030e6cb_Testimonial-Patti-Chimkire-New.webp" alt="Patti Chimkire" className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <p className="font-bold text-[#1a1a1a] text-sm">Patti Chimkire</p>
                    <p className="text-gray-500 text-sm">Founder and Pastry Chef, Mali Bakes</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={200}>
              <div className="bg-[#f5f5f5] p-6 rounded-2xl h-full">
                <p className="text-[#1a1a1a] font-medium mb-4">"I use Linktree's analytics to better understand my audience and what converts them."</p>
                <div className="flex items-center gap-3">
                  <img src="https://cdn.prod.website-files.com/666255f7f2126f4e8cec6f8f/668645339d6bfad6723a29c2_Testimonial-Luke-Kidgell2.webp" alt="Luke Kidgell" className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <p className="font-bold text-[#1a1a1a] text-sm">Luke Kidgell</p>
                    <p className="text-gray-500 text-sm">Comedian</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <ScrollReveal>
              <div className="bg-[#f5f5f5] p-6 rounded-2xl">
                <p className="text-[#1a1a1a] font-medium mb-4">"My Linktree resume stood out from the rest, securing me my first full-time job as a TV reporter!"</p>
                <div className="flex items-center gap-3">
                  <img src="https://cdn.prod.website-files.com/666255f7f2126f4e8cec6f8f/668645334e5d2a5fe786925d_Testimonial-Risa-Utama.webp" alt="Rise Utama" className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <p className="font-bold text-[#1a1a1a] text-sm">Rise Utama</p>
                    <p className="text-gray-500 text-sm">TV Reporter and Producer</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={100}>
              <div className="bg-[#f5f5f5] p-6 rounded-2xl">
                <p className="text-[#1a1a1a] font-medium mb-4">"With Linktree, I can definitely see the monetization of my following becoming a full-time thing."</p>
                <div className="flex items-center gap-3">
                  <img src="https://cdn.prod.website-files.com/666255f7f2126f4e8cec6f8f/66864533e85838c661396b01_Testimonial-David-Coleman.webp" alt="David Coleman" className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <p className="font-bold text-[#1a1a1a] text-sm">David Coleman</p>
                    <p className="text-gray-500 text-sm">Founder, Mechanicallyincleyend</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1a1a1a] py-12 px-6">
        <ScrollReveal>
          <div className="max-w-6xl mx-auto">
            <div className="text-2xl font-bold text-white mb-8">Linktree</div>
            
            <div className="grid md:grid-cols-4 gap-8 text-sm">
              <div>
                <h4 className="font-bold text-white mb-4">Company</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-white transition">About</a></li>
                  <li><a href="#" className="hover:text-white transition">Careers</a></li>
                  <li><a href="#" className="hover:text-white transition">Press</a></li>
                  <li><a href="#" className="hover:text-white transition">Contact</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-bold text-white mb-4">Community</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-white transition">Linktree for Enterprise</a></li>
                  <li><a href="#" className="hover:text-white transition">Creator Report</a></li>
                  <li><a href="#" className="hover:text-white transition">Templates</a></li>
                  <li><a href="#" className="hover:text-white transition">Explore</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-bold text-white mb-4">Support</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-white transition">Help Topics</a></li>
                  <li><a href="#" className="hover:text-white transition">Getting Started</a></li>
                  <li><a href="#" className="hover:text-white transition">Linktree Pro</a></li>
                  <li><a href="#" className="hover:text-white transition">Features & How-Tos</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-bold text-white mb-4">Trust & Legal</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
                  <li><a href="#" className="hover:text-white transition">Terms of Service</a></li>
                  <li><a href="#" className="hover:text-white transition">Cookie Preferences</a></li>
                </ul>
              </div>
            </div>
            
            <div className="mt-12 pt-8 border-t border-gray-800 text-gray-500 text-sm">
              © 2024 Linktree
            </div>
          </div>
        </ScrollReveal>
      </footer>
    </div>
  );
}
