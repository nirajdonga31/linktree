'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';

export default function SignupPage() {
  const { signUpWithEmail, loading, error, clearError } = useAuth();
  const router = useRouter();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleEmailSignup = async (e: FormEvent) => {
    e.preventDefault();
    if (!email || !password || !displayName) return;

    setIsSubmitting(true);
    clearError();
    
    try {
      await signUpWithEmail(email, password, displayName);
      router.push('/admin');
    } catch {
      // Error handled in auth hook
    } finally {
      setIsSubmitting(false);
    }
  };

  const isLoading = loading || isSubmitting;

  return (
    <div className="min-h-screen flex">
      {/* Left side - Banner Image */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-[55%] relative">
        <img
          src="https://linktr.ee/universal-login/assets/banner-login-desktop-D8selsDi.webp"
          alt="Linktree Signup Banner"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {/* Right side - Signup Form */}
      <div className="w-full lg:w-1/2 xl:w-[45%] flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-[400px]">
          <div className="mb-8">
            <h1 className="text-[2rem] font-bold text-[#1e2330] mb-2 tracking-[-0.02em]">
              Create your account
            </h1>
            <p className="text-[#676b5f] text-[1rem]">
              Sign up for free to start sharing your links.
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {/* Email Form */}
          <form onSubmit={handleEmailSignup} className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Display Name"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                required
                disabled={isLoading}
                className="w-full px-4 py-3 border-2 border-[#e0e2d9] rounded-lg focus:outline-none focus:border-[#1e2330] transition text-[#1e2330] placeholder:text-[#9b9b9b] disabled:opacity-50"
              />
            </div>
            
            <div>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
                className="w-full px-4 py-3 border-2 border-[#e0e2d9] rounded-lg focus:outline-none focus:border-[#1e2330] transition text-[#1e2330] placeholder:text-[#9b9b9b] disabled:opacity-50"
              />
            </div>
            
            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                disabled={isLoading}
                className="w-full px-4 py-3 border-2 border-[#e0e2d9] rounded-lg focus:outline-none focus:border-[#1e2330] transition text-[#1e2330] placeholder:text-[#9b9b9b] disabled:opacity-50"
              />
              <p className="text-xs text-gray-500 mt-1 ml-1">Must be at least 6 characters</p>
            </div>

            <button
              type="submit"
              disabled={isLoading || !email || !password || !displayName}
              className="w-full py-3 px-4 bg-[#1e2330] text-white rounded-full font-bold hover:bg-black transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Creating account...' : 'Sign up'}
            </button>
          </form>

          {/* Login Link */}
          <p className="text-center mt-6 text-[#676b5f]">
            Already have an account?{' '}
            <Link href="/login" className="text-[#2665d6] font-semibold hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
