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

// Dropdown Component with better animations
function NavDropdown({ label, children }: { label: string; children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsHovered(true);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    timeoutRef.current = setTimeout(() => setIsOpen(false), 200);
  };

  return (
    <div 
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button 
        className={`flex items-center gap-1.5 py-2 px-3 rounded-full transition-all duration-300 ${
          isHovered ? 'bg-gray-100 text-[#1e2330]' : 'hover:opacity-70'
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {label}
        <svg 
          className={`w-4 h-4 transition-transform duration-300 ease-out ${isOpen ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      <div 
        className={`absolute top-full left-1/2 -translate-x-1/2 pt-3 transition-all duration-300 ease-out ${
          isOpen 
            ? 'opacity-100 translate-y-0 pointer-events-auto' 
            : 'opacity-0 -translate-y-3 pointer-events-none'
        }`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.2)] border border-gray-100/50 p-3 min-w-[240px] overflow-hidden">
          <div className={`transition-all duration-300 delay-100 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

function DropdownItem({ href, icon, title, desc, delay = 0 }: { href: string; icon: string; title: string; desc?: string; delay?: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link 
      href={href}
      className="flex items-start gap-4 p-3.5 rounded-2xl transition-all duration-300 ease-out group relative overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Background slide effect */}
      <div 
        className={`absolute inset-0 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl transition-all duration-300 ease-out ${
          isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
      />
      
      {/* Icon with bounce animation */}
      <span 
        className={`text-2xl relative z-10 transition-all duration-300 ${
          isHovered ? 'scale-125 rotate-6' : 'scale-100 rotate-0'
        }`}
      >
        {icon}
      </span>
      
      <div className="relative z-10 flex-1">
        <p className={`font-bold text-[#1e2330] text-sm transition-all duration-200 ${isHovered ? 'translate-x-1' : ''}`}>
          {title}
        </p>
        {desc && (
          <p className={`text-xs text-gray-500 mt-1 transition-all duration-300 delay-75 ${isHovered ? 'translate-x-1 opacity-100' : 'opacity-80'}`}>
            {desc}
          </p>
        )}
      </div>
      
      {/* Arrow indicator */}
      <svg 
        className={`w-4 h-4 text-gray-400 relative z-10 transition-all duration-300 ${
          isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'
        }`}
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </Link>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-[#d2e823] font-sans">
      {/* Navbar */}
      <div className="sticky top-0 z-50 px-6 py-4">
        <nav className="bg-white rounded-full px-6 py-3 flex items-center justify-between max-w-6xl mx-auto shadow-sm">
          <div className="text-[2rem] font-bold text-[#1e2330] tracking-[-0.02em]">Linktree</div>
          <div className="hidden lg:flex items-center gap-6 text-[15px] font-semibold text-[#1e2330]">
            
            {/* Products Dropdown */}
            <NavDropdown label="Products">
              <DropdownItem href="#" icon="🔗" title="Link in Bio" desc="Your free link in bio" delay={0} />
              <DropdownItem href="#" icon="🛒" title="Store" desc="Sell products & collect tips" delay={50} />
              <DropdownItem href="#" icon="📊" title="Analytics" desc="Track your growth" delay={100} />
            </NavDropdown>

            {/* Templates Dropdown */}
            <NavDropdown label="Templates">
              <DropdownItem href="#" icon="🎨" title="Creator" desc="For content creators" delay={0} />
              <DropdownItem href="#" icon="🎵" title="Musician" desc="For artists & bands" delay={50} />
              <DropdownItem href="#" icon="🏢" title="Business" desc="For companies" delay={100} />
            </NavDropdown>

            {/* Marketplace */}
            <a href="#" className="hover:opacity-70 transition py-2">Marketplace</a>

            {/* Learn Dropdown */}
            <NavDropdown label="Learn">
              <DropdownItem href="#" icon="📖" title="Blog" desc="Tips & tutorials" delay={0} />
              <DropdownItem href="#" icon="❓" title="Help Center" desc="Get support" delay={50} />
              <DropdownItem href="#" icon="🎓" title="Creator Report" desc="Industry insights" delay={100} />
            </NavDropdown>

            {/* Pricing */}
            <a href="#" className="hover:opacity-70 transition py-2">Pricing</a>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-[#1e2330] hover:opacity-70 font-semibold text-[15px] px-4 py-2">
              Log in
            </Link>
            <Link 
              href="/login" 
              className="bg-[#1e2330] text-white px-6 py-2.5 rounded-full font-bold text-[15px] hover:bg-black transition"
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
            <h1 className="text-[4rem] leading-[1.1] font-bold text-[#1e2330] mb-6 tracking-[-0.02em]">
              A link in bio
              <br />
              built for you.
            </h1>
            
            <p className="text-[1rem] leading-[1.5] text-[#1e2330] mb-8 max-w-lg">
              Join 70M+ people using Linktree for their link in bio. One link to help you share everything you create, curate and sell from your Instagram, TikTok, Twitter, YouTube and other social media profiles.
            </p>

            {/* Sign up form */}
            <div className="flex flex-col sm:flex-row gap-3 max-w-md">
              <div className="flex-1 bg-white rounded-full px-5 py-3.5 flex items-center border-2 border-[#e0e2d9] focus-within:border-[#1e2330] transition shadow-sm">
                <span className="text-[#676b5f] font-semibold text-[16px]">linktr.ee/</span>
                <input 
                  type="text" 
                  placeholder="yourname"
                  className="flex-1 outline-none bg-transparent ml-1 text-[#1e2330] font-semibold text-[16px] placeholder:text-[#9b9b9b]"
                />
              </div>
              <Link 
                href="/login" 
                className="bg-[#1e2330] text-white px-6 py-3.5 rounded-full font-bold text-[16px] hover:bg-black transition whitespace-nowrap text-center"
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
      <section className="bg-[#d2e823] py-12 border-t border-[#1e2330]/10">
        <ScrollReveal>
          <div className="max-w-6xl mx-auto px-6">
            <p className="text-center text-[#1e2330] font-semibold mb-8 text-sm">Used by the world&apos;s biggest creators and brands</p>
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

      {/* Feature 1 - Blue Gradient BG */}
      <section className="bg-gradient-to-br from-blue-500 via-blue-600 to-blue-800 py-24 px-6 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
        
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
          <ScrollReveal>
            <div className="space-y-6">
              <h2 className="text-[3.5rem] leading-[1.1] font-bold text-white mb-6 tracking-[-0.02em]">
                Create and customize your Linktree in minutes
              </h2>
              <p className="text-[1.125rem] leading-[1.6] text-blue-100">
                Connect all your content across social media, websites, stores and more in one link in bio. Customize every detail or let Linktree automatically enhance it to match your brand and drive more clicks.
              </p>
              <Link 
                href="/login" 
                className="inline-flex items-center gap-2 mt-8 bg-white text-blue-600 px-8 py-4 rounded-full font-bold hover:bg-blue-50 transition-all duration-300 hover:scale-105 hover:shadow-lg group"
              >
                Get started for free
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </ScrollReveal>
          
          <ScrollReveal delay={200}>
            <div className="relative group">
              {/* Glow effect behind video */}
              <div className="absolute -inset-4 bg-blue-400/30 rounded-3xl blur-2xl group-hover:bg-blue-400/40 transition-all duration-500"></div>
              <div className="relative hover:scale-[1.03] transition-transform duration-500 hover:rotate-1">
                <video 
                  src="https://assets.production.linktr.ee/static/curate/customise_your_linktree.webm" 
                  autoPlay 
                  loop 
                  muted 
                  playsInline 
                  className="w-full rounded-2xl shadow-2xl"
                />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Feature 2 - Shade (Dark) BG */}
      <section className="bg-[#1e2330] py-20 px-6">
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
              <h2 className="text-[3rem] leading-[1.2] font-bold text-white mb-4 tracking-[-0.02em]">
                Share your Linktree anywhere you like!
              </h2>
              <p className="text-[1rem] leading-[1.5] text-[#e0e2d9]">
                Add your unique Linktree URL to all the platforms and places you find your audience. Then use your QR code to drive your offline traffic back to your link in bio.
              </p>
              <Link 
                href="/login" 
                className="inline-block mt-6 bg-white text-[#1e2330] px-6 py-3 rounded-full font-bold hover:bg-gray-100 transition"
              >
                Get started for free
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Feature 3 - Marble BG */}
      <section className="bg-[#f3f3f1] py-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <ScrollReveal>
            <div>
              <h2 className="text-[3rem] leading-[1.2] font-bold text-[#1e2330] mb-4 tracking-[-0.02em]">
                Analyze your audience and keep them engaged
              </h2>
              <p className="text-[1rem] leading-[1.5] text-[#1e2330]">
                Track your engagement over time, monitor revenue and learn what&apos;s converting your audience. Make informed updates on the fly to keep them coming back.
              </p>
              <Link 
                href="/login" 
                className="inline-block mt-6 bg-[#1e2330] text-white px-6 py-3 rounded-full font-bold hover:bg-black transition"
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

      {/* Feature 4 - Lavender BG */}
      <section className="bg-[#e9c0e9] py-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <ScrollReveal delay={200}>
            <div className="hover:scale-[1.02] transition-transform duration-500">
              <img 
                src="https://cdn.prod.website-files.com/666255f7f2126f4e8cec6f8f/68b80742d1d9216c45c6d6ea_group1597882005.avif" 
                alt="Linktree Features"
                className="w-full rounded-2xl shadow-2xl"
              />
            </div>
          </ScrollReveal>
          
          <ScrollReveal>
            <div>
              <h2 className="text-[3rem] leading-[1.2] font-bold text-[#1e2330] mb-4 tracking-[-0.02em]">
                Grow your following across all platforms
              </h2>
              <p className="text-[1rem] leading-[1.5] text-[#1e2330]">
                Connect with your audience everywhere they are. From social media to email, your Linktree brings it all together in one beautiful link.
              </p>
              <Link 
                href="/login" 
                className="inline-block mt-6 bg-[#1e2330] text-white px-6 py-3 rounded-full font-bold hover:bg-black transition"
              >
                Get started for free
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Feature 5 - Rose (Red) BG */}
      <section className="bg-[#fc3e4b] py-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <ScrollReveal>
            <div>
              <h2 className="text-[3rem] leading-[1.2] font-bold text-white mb-4 tracking-[-0.02em]">
                Monetize your content effortlessly
              </h2>
              <p className="text-[1rem] leading-[1.5] text-white/90">
                Accept payments, sell products, and collect tips directly through your Linktree. Turn your followers into customers with built-in commerce tools.
              </p>
              <Link 
                href="/login" 
                className="inline-block mt-6 bg-white text-[#fc3e4b] px-6 py-3 rounded-full font-bold hover:bg-gray-100 transition"
              >
                Get started for free
              </Link>
            </div>
          </ScrollReveal>
          
          <ScrollReveal delay={200}>
            <div className="hover:scale-[1.02] transition-transform duration-500">
              <img 
                src="https://cdn.prod.website-files.com/666255f7f2126f4e8cec6f8f/6882edcf6915328005a76e24_frame1197145639.avif" 
                alt="Monetization"
                className="w-full rounded-2xl shadow-2xl"
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Feature 6 - Iris (Dark Blue) BG */}
      <section className="bg-[#061492] py-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <ScrollReveal delay={200}>
            <div className="hover:scale-[1.02] transition-transform duration-500">
              <img 
                src="https://cdn.prod.website-files.com/666255f7f2126f4e8cec6f8f/68b80693934ab0ccd4bf7482_home-section-4.avif" 
                alt="Linktree for Business"
                className="w-full rounded-2xl shadow-2xl"
              />
            </div>
          </ScrollReveal>
          
          <ScrollReveal>
            <div>
              <h2 className="text-[3rem] leading-[1.2] font-bold text-white mb-4 tracking-[-0.02em]">
                Trusted by millions of creators
              </h2>
              <p className="text-[1rem] leading-[1.5] text-white/90">
                From influencers to entrepreneurs, podcasters to artists — Linktree is the link in bio tool that helps everyone share more.
              </p>
              <Link 
                href="/login" 
                className="inline-block mt-6 bg-white text-[#061492] px-6 py-3 rounded-full font-bold hover:bg-gray-100 transition"
              >
                Get started for free
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Press Logos - Marble BG */}
      <section className="bg-[#f3f3f1] py-16 px-6">
        <ScrollReveal>
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-[#1e2330] font-semibold mb-8">As featured in...</p>
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
      <section className="bg-white py-20 px-6 border-t border-[#e0e2d9]">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <h2 className="text-[2rem] leading-[1.2] font-bold text-[#1e2330] mb-12 text-center tracking-[-0.02em]">As featured in...</h2>
          </ScrollReveal>
          
          <div className="grid md:grid-cols-3 gap-6">
            <ScrollReveal>
              <div className="bg-[#f3f3f1] p-6 rounded-2xl h-full">
                <p className="text-[#1e2330] font-medium mb-4">&quot;Linktree simplifies the process for creators to share multiple parts of themselves in one inclusive link.&quot;</p>
                <div className="flex items-center gap-3">
                  <img src="https://cdn.prod.website-files.com/666255f7f2126f4e8cec6f8f/66864533566fcb42ef955aad_Testimonial-Riley-Lemon.webp" alt="Riley Lemon" className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <p className="font-bold text-[#1e2330] text-sm">Riley Lemon</p>
                    <p className="text-[#676b5f] text-sm">Youtuber, Content Creator</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={100}>
              <div className="bg-[#f3f3f1] p-6 rounded-2xl h-full">
                <p className="text-[#1e2330] font-medium mb-4">&quot;Linktree helps my customers get where they need to go. It&apos;s fast and easy.&quot;</p>
                <div className="flex items-center gap-3">
                  <img src="https://cdn.prod.website-files.com/666255f7f2126f4e8cec6f8f/66864534504211c47030e6cb_Testimonial-Patti-Chimkire-New.webp" alt="Patti Chimkire" className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <p className="font-bold text-[#1e2330] text-sm">Patti Chimkire</p>
                    <p className="text-[#676b5f] text-sm">Founder and Pastry Chef, Mali Bakes</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={200}>
              <div className="bg-[#f3f3f1] p-6 rounded-2xl h-full">
                <p className="text-[#1e2330] font-medium mb-4">&quot;I use Linktree&apos;s analytics to better understand my audience and what converts them.&quot;</p>
                <div className="flex items-center gap-3">
                  <img src="https://cdn.prod.website-files.com/666255f7f2126f4e8cec6f8f/668645339d6bfad6723a29c2_Testimonial-Luke-Kidgell2.webp" alt="Luke Kidgell" className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <p className="font-bold text-[#1e2330] text-sm">Luke Kidgell</p>
                    <p className="text-[#676b5f] text-sm">Comedian</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <ScrollReveal>
              <div className="bg-[#f3f3f1] p-6 rounded-2xl">
                <p className="text-[#1e2330] font-medium mb-4">&quot;My Linktree resume stood out from the rest, securing me my first full-time job as a TV reporter!&quot;</p>
                <div className="flex items-center gap-3">
                  <img src="https://cdn.prod.website-files.com/666255f7f2126f4e8cec6f8f/668645334e5d2a5fe786925d_Testimonial-Risa-Utama.webp" alt="Rise Utama" className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <p className="font-bold text-[#1e2330] text-sm">Rise Utama</p>
                    <p className="text-[#676b5f] text-sm">TV Reporter and Producer</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={100}>
              <div className="bg-[#f3f3f1] p-6 rounded-2xl">
                <p className="text-[#1e2330] font-medium mb-4">&quot;With Linktree, I can definitely see the monetization of my following becoming a full-time thing.&quot;</p>
                <div className="flex items-center gap-3">
                  <img src="https://cdn.prod.website-files.com/666255f7f2126f4e8cec6f8f/66864533e85838c661396b01_Testimonial-David-Coleman.webp" alt="David Coleman" className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <p className="font-bold text-[#1e2330] text-sm">David Coleman</p>
                    <p className="text-[#676b5f] text-sm">Founder, Mechanicallyincleyend</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1e2330] py-12 px-6">
        <ScrollReveal>
          <div className="max-w-6xl mx-auto">
            <div className="text-[2rem] font-bold text-white mb-8 tracking-[-0.02em]">Linktree</div>
            
            <div className="grid md:grid-cols-4 gap-8 text-sm">
              <div>
                <h4 className="font-bold text-white mb-4">Company</h4>
                <ul className="space-y-2 text-[#9b9b9b]">
                  <li><a href="#" className="hover:text-white transition">About</a></li>
                  <li><a href="#" className="hover:text-white transition">Careers</a></li>
                  <li><a href="#" className="hover:text-white transition">Press</a></li>
                  <li><a href="#" className="hover:text-white transition">Contact</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-bold text-white mb-4">Community</h4>
                <ul className="space-y-2 text-[#9b9b9b]">
                  <li><a href="#" className="hover:text-white transition">Linktree for Enterprise</a></li>
                  <li><a href="#" className="hover:text-white transition">Creator Report</a></li>
                  <li><a href="#" className="hover:text-white transition">Templates</a></li>
                  <li><a href="#" className="hover:text-white transition">Explore</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-bold text-white mb-4">Support</h4>
                <ul className="space-y-2 text-[#9b9b9b]">
                  <li><a href="#" className="hover:text-white transition">Help Topics</a></li>
                  <li><a href="#" className="hover:text-white transition">Getting Started</a></li>
                  <li><a href="#" className="hover:text-white transition">Linktree Pro</a></li>
                  <li><a href="#" className="hover:text-white transition">Features & How-Tos</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-bold text-white mb-4">Trust & Legal</h4>
                <ul className="space-y-2 text-[#9b9b9b]">
                  <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
                  <li><a href="#" className="hover:text-white transition">Terms of Service</a></li>
                  <li><a href="#" className="hover:text-white transition">Cookie Preferences</a></li>
                </ul>
              </div>
            </div>
            
            <div className="mt-12 pt-8 border-t border-[#676b5f]/30 text-[#9b9b9b] text-sm">
              © 2024 Linktree
            </div>
          </div>
        </ScrollReveal>
      </footer>
    </div>
  );
}
