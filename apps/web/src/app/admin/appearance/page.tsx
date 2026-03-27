'use client';

import { useState } from 'react';
import { useAuth } from '@/hooks/use-auth';

export default function AppearancePage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('header');
  const [profileLayout, setProfileLayout] = useState<'classic' | 'hero'>('classic');
  const [titleStyle, setTitleStyle] = useState<'text' | 'logo'>('text');
  const [titleSize, setTitleSize] = useState<'small' | 'large'>('small');
  const [altFont, setAltFont] = useState(false);
  const [titleColor, setTitleColor] = useState('#F5F6F7');
  
  const username = user?.displayName?.toLowerCase().replace(/\s+/g, '') || 'user';

  const tabs = [
    { id: 'header', label: 'Header', icon: '👤' },
    { id: 'theme', label: 'Theme', icon: '🎨' },
    { id: 'wallpaper', label: 'Wallpaper', icon: '🖼️' },
    { id: 'text', label: 'Text', icon: 'T' },
    { id: 'buttons', label: 'Buttons', icon: '▭' },
    { id: 'colors', label: 'Colors', icon: '🎨' },
    { id: 'footer', label: 'Footer', icon: '⚡' },
  ];

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Design</h1>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition ${
              activeTab === tab.id
                ? 'bg-black text-white'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            <span>{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="space-y-8">
        {/* Profile Image Section */}
        <section>
          <h3 className="text-sm font-medium text-gray-900 mb-4">Profile image</h3>
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
              <svg className="w-10 h-10 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
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
              className={`p-6 rounded-2xl border-2 transition flex flex-col items-center gap-2 ${
                profileLayout === 'classic'
                  ? 'border-black bg-gray-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="w-12 h-12 rounded-full border-2 border-gray-300 flex items-center justify-center">
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <span className="text-sm text-gray-600">Classic</span>
            </button>
            <button
              onClick={() => setProfileLayout('hero')}
              className={`p-6 rounded-2xl border-2 transition flex flex-col items-center gap-2 ${
                profileLayout === 'hero'
                  ? 'border-black bg-gray-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="w-12 h-12 rounded-lg border-2 border-gray-300 flex items-center justify-center">
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="text-sm text-gray-600">Hero</span>
              {profileLayout === 'hero' && (
                <svg className="w-4 h-4 text-purple-600 absolute top-2 right-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          </div>
        </section>

        {/* Title Section */}
        <section>
          <h3 className="text-sm font-medium text-gray-900 mb-4">Title</h3>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <input
              type="text"
              value={`@${username}`}
              readOnly
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
              className={`p-6 rounded-2xl border-2 transition flex flex-col items-center gap-2 ${
                titleStyle === 'text'
                  ? 'border-black bg-gray-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <span className="text-2xl font-medium">Aa</span>
              <span className="text-sm text-gray-600">Text</span>
            </button>
            <button
              onClick={() => setTitleStyle('logo')}
              className={`p-6 rounded-2xl border-2 transition flex flex-col items-center gap-2 relative ${
                titleStyle === 'logo'
                  ? 'border-black bg-gray-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-sm text-gray-600">Logo</span>
              <svg className="w-4 h-4 text-purple-600 absolute top-2 right-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </section>

        {/* Size */}
        <section>
          <h3 className="text-sm font-medium text-gray-900 mb-4">Size</h3>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => setTitleSize('small')}
              className={`p-4 rounded-2xl border-2 transition ${
                titleSize === 'small'
                  ? 'border-black bg-gray-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <span className="text-sm text-gray-600">Small</span>
            </button>
            <button
              onClick={() => setTitleSize('large')}
              className={`p-4 rounded-2xl border-2 transition relative ${
                titleSize === 'large'
                  ? 'border-black bg-gray-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <span className="text-sm text-gray-600">Large</span>
              <svg className="w-4 h-4 text-purple-600 absolute top-2 right-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </section>

        {/* Alternative Title Font Toggle */}
        <section className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium text-gray-900">Alternative title font</h3>
            <p className="text-xs text-gray-500">Matches page font by default</p>
          </div>
          <button
            onClick={() => setAltFont(!altFont)}
            className={`w-12 h-6 rounded-full transition relative ${
              altFont ? 'bg-purple-600' : 'bg-gray-300'
            }`}
          >
            <svg className="w-4 h-4 text-purple-600 absolute top-1 right-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <div
              className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-all ${
                altFont ? 'right-0.5' : 'left-0.5'
              }`}
            />
          </button>
        </section>

        {/* Title Font Color */}
        <section>
          <h3 className="text-sm font-medium text-gray-900 mb-4">Title font color</h3>
          <div className="flex items-center gap-4 bg-white rounded-xl border border-gray-200 p-4">
            <input
              type="text"
              value={titleColor}
              onChange={(e) => setTitleColor(e.target.value)}
              className="flex-1 text-gray-900 font-mono text-sm bg-transparent outline-none"
            />
            <div
              className="w-8 h-8 rounded-full border border-gray-200"
              style={{ backgroundColor: titleColor }}
            />
          </div>
        </section>
      </div>
    </div>
  );
}
