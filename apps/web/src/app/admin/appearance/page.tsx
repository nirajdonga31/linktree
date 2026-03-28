'use client';

import { useState } from 'react';
import { useAuth } from '@/hooks/use-auth';

interface Tab {
  id: string;
  label: string;
  icon: React.ReactNode;
}

const tabs: Tab[] = [
  {
    id: 'header',
    label: 'Header',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
  {
    id: 'theme',
    label: 'Theme',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
    ),
  },
  {
    id: 'wallpaper',
    label: 'Wallpaper',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    id: 'text',
    label: 'Text',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h7" />
      </svg>
    ),
  },
  {
    id: 'buttons',
    label: 'Buttons',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
      </svg>
    ),
  },
  {
    id: 'colors',
    label: 'Colors',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
  },
  {
    id: 'footer',
    label: 'Footer',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
  },
];

export default function AppearancePage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('header');
  const [profileLayout, setProfileLayout] = useState<'classic' | 'hero'>('classic');
  const [titleStyle, setTitleStyle] = useState<'text' | 'logo'>('text');
  const [titleSize, setTitleSize] = useState<'small' | 'large'>('small');
  const [altFont, setAltFont] = useState(false);
  const [titleColor, setTitleColor] = useState('#F5F6F7');

  const username = user?.displayName?.toLowerCase().replace(/\s+/g, '') || 'mercbarnal';

  return (
    <div className="flex">
      {/* Left Sidebar - Tabs */}
      <div className="w-44 flex-shrink-0 border-r border-gray-200 pr-4">
        <nav className="space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                activeTab === tab.id
                  ? 'bg-gray-100 text-gray-900'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <span className={activeTab === tab.id ? 'text-gray-900' : 'text-gray-500'}>
                {tab.icon}
              </span>
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Content Area */}
      <div className="flex-1 pl-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-bold text-gray-900">Design</h1>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50 transition">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
            Enhance
          </button>
        </div>

        <div className="space-y-8 pb-8">
          {/* Profile Image Section */}
          <section>
            <h3 className="text-sm font-medium text-gray-900 mb-4">Profile image</h3>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-full text-sm font-medium hover:bg-gray-800 transition">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add
              </button>
            </div>
          </section>

          {/* Profile Image Layout */}
          <section>
            <h3 className="text-sm font-medium text-gray-900 mb-4">Profile image layout</h3>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setProfileLayout('classic')}
                className={`py-4 px-6 rounded-2xl border-2 transition flex flex-col items-center gap-2 relative ${
                  profileLayout === 'classic'
                    ? 'border-black bg-gray-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="w-10 h-10 rounded-full border-2 border-gray-400 flex items-center justify-center">
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <span className="text-sm text-gray-600">Classic</span>
              </button>
              <button
                onClick={() => setProfileLayout('hero')}
                className={`py-4 px-6 rounded-2xl border-2 transition flex flex-col items-center gap-2 relative ${
                  profileLayout === 'hero'
                    ? 'border-black bg-gray-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="absolute top-2 right-2">
                  <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="w-10 h-10 rounded-lg border-2 border-gray-400 flex items-center justify-center">
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="text-sm text-gray-600">Hero</span>
              </button>
            </div>
          </section>

          {/* Title Section */}
          <section>
            <h3 className="text-sm font-medium text-gray-900 mb-4">Title</h3>
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <input
                type="text"
                defaultValue={`@${username}`}
                className="w-full text-gray-900 font-medium bg-transparent outline-none"
              />
            </div>
          </section>

          {/* Title Style */}
          <section>
            <h3 className="text-sm font-medium text-gray-900 mb-4">Title style</h3>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setTitleStyle('text')}
                className={`py-4 px-6 rounded-2xl border-2 transition flex flex-col items-center gap-2 relative ${
                  titleStyle === 'text'
                    ? 'border-black bg-gray-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <span className="text-xl font-medium text-gray-700">Aa</span>
                <span className="text-sm text-gray-600">Text</span>
              </button>
              <button
                onClick={() => setTitleStyle('logo')}
                className={`py-4 px-6 rounded-2xl border-2 transition flex flex-col items-center gap-2 relative ${
                  titleStyle === 'logo'
                    ? 'border-black bg-gray-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="absolute top-2 right-2">
                  <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-sm text-gray-600">Logo</span>
              </button>
            </div>
          </section>

          {/* Size */}
          <section>
            <h3 className="text-sm font-medium text-gray-900 mb-4">Size</h3>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setTitleSize('small')}
                className={`py-4 px-6 rounded-2xl border-2 transition flex items-center justify-center relative ${
                  titleSize === 'small'
                    ? 'border-black bg-gray-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <span className="text-sm text-gray-600">Small</span>
              </button>
              <button
                onClick={() => setTitleSize('large')}
                className={`py-4 px-6 rounded-2xl border-2 transition flex items-center justify-center relative ${
                  titleSize === 'large'
                    ? 'border-black bg-gray-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="absolute top-2 right-2">
                  <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-sm text-gray-600">Large</span>
              </button>
            </div>
          </section>

          {/* Alternative Title Font Toggle */}
          <section className="flex items-center justify-between py-2">
            <div>
              <h3 className="text-sm font-medium text-gray-900">Alternative title font</h3>
              <p className="text-xs text-gray-500 mt-0.5">Matches page font by default</p>
            </div>
            <div className="flex items-center gap-3">
              <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              <button
                onClick={() => setAltFont(!altFont)}
                className={`w-11 h-6 rounded-full transition relative ${
                  altFont ? 'bg-green-500' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-all ${
                    altFont ? 'right-0.5' : 'left-0.5'
                  }`}
                />
              </button>
            </div>
          </section>

          {/* Title Font Color */}
          <section>
            <h3 className="text-sm font-medium text-gray-900 mb-4">Title font color</h3>
            <div className="flex items-center gap-4 bg-white rounded-xl border border-gray-200 p-3">
              <span className="text-gray-500 font-mono text-sm">{titleColor}</span>
              <div className="flex-1" />
              <div
                className="w-6 h-6 rounded-full border border-gray-200 cursor-pointer"
                style={{ backgroundColor: titleColor }}
                onClick={() => {
                  const input = document.createElement('input');
                  input.type = 'color';
                  input.value = titleColor;
                  input.onchange = (e) => setTitleColor((e.target as HTMLInputElement).value);
                  input.click();
                }}
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
