'use client';

import { useState } from 'react';
import { Theme } from '@linktree/shared';

const presets = [
  { id: 'minimal', name: 'Minimal', bg: '#ffffff', btn: '#000000' },
  { id: 'gradient', name: 'Gradient', bg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', btn: '#ffffff' },
  { id: 'image', name: 'Image', bg: '#1a1a1a', btn: '#ffffff' },
  { id: 'custom', name: 'Custom', bg: '#f3f4f6', btn: '#374151' },
];

const fonts = [
  { id: 'inter', name: 'Inter' },
  { id: 'roboto', name: 'Roboto' },
  { id: 'poppins', name: 'Poppins' },
  { id: 'playfair', name: 'Playfair' },
];

export default function AppearancePage() {
  const [theme, setTheme] = useState<Theme>({
    preset: 'minimal',
    backgroundColor: '#ffffff',
    buttonColor: '#000000',
    buttonTextColor: '#ffffff',
    fontFamily: 'inter',
  });

  const [profile, setProfile] = useState({
    displayName: '',
    bio: '',
  });

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold mb-6">Appearance</h1>

      {/* Profile Section */}
      <section className="bg-white p-6 rounded-xl border border-gray-200 mb-6">
        <h2 className="text-lg font-semibold mb-4">Profile</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Avatar</label>
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-300 transition">
            <span className="text-gray-500">Upload</span>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Display Name</label>
          <input
            type="text"
            value={profile.displayName}
            onChange={(e) => setProfile({ ...profile, displayName: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            placeholder="Your name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Bio</label>
          <textarea
            value={profile.bio}
            onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            rows={3}
            maxLength={160}
            placeholder="Tell us about yourself"
          />
          <p className="text-sm text-gray-500 mt-1">{profile.bio.length}/160</p>
        </div>
      </section>

      {/* Theme Section */}
      <section className="bg-white p-6 rounded-xl border border-gray-200">
        <h2 className="text-lg font-semibold mb-4">Theme</h2>

        <div className="mb-6">
          <p className="text-sm font-medium mb-3">Preset</p>
          <div className="grid grid-cols-4 gap-3">
            {presets.map((preset) => (
              <button
                key={preset.id}
                onClick={() => setTheme({ ...theme, preset: preset.id as Theme['preset'] })}
                className={`p-3 rounded-lg border-2 transition ${
                  theme.preset === preset.id
                    ? 'border-purple-600'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div
                  className="w-full h-12 rounded mb-2"
                  style={{ background: preset.bg }}
                />
                <p className="text-sm">{preset.name}</p>
              </button>
            ))}
          </div>
        </div>

        {theme.preset === 'custom' && (
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium mb-2">Background Color</label>
              <input
                type="color"
                value={theme.backgroundColor}
                onChange={(e) => setTheme({ ...theme, backgroundColor: e.target.value })}
                className="w-full h-10 rounded cursor-pointer"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Button Color</label>
              <input
                type="color"
                value={theme.buttonColor}
                onChange={(e) => setTheme({ ...theme, buttonColor: e.target.value })}
                className="w-full h-10 rounded cursor-pointer"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Button Text Color</label>
              <input
                type="color"
                value={theme.buttonTextColor}
                onChange={(e) => setTheme({ ...theme, buttonTextColor: e.target.value })}
                className="w-full h-10 rounded cursor-pointer"
              />
            </div>
          </div>
        )}

        {theme.preset === 'image' && (
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Background Image</label>
            <div className="w-full h-32 bg-gray-200 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-300 transition">
              <span className="text-gray-500">Click to upload image</span>
            </div>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium mb-2">Font</label>
          <select
            value={theme.fontFamily}
            onChange={(e) => setTheme({ ...theme, fontFamily: e.target.value as Theme['fontFamily'] })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          >
            {fonts.map((font) => (
              <option key={font.id} value={font.id}>
                {font.name}
              </option>
            ))}
          </select>
        </div>
      </section>
    </div>
  );
}
