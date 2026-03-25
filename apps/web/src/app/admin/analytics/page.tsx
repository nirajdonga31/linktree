'use client';

import { useState } from 'react';

const dateRanges = [
  { id: '7d', label: 'Last 7 days' },
  { id: '30d', label: 'Last 30 days' },
  { id: '90d', label: 'Last 90 days' },
  { id: 'all', label: 'All time' },
];

export default function AnalyticsPage() {
  const [range, setRange] = useState('7d');

  // Mock data - would come from API
  const stats = {
    views: 1234,
    viewsChange: 12.5,
    clicks: 567,
    clicksChange: -5.2,
    ctr: 45.9,
  };

  const topLinks = [
    { id: '1', title: 'Portfolio', clicks: 234 },
    { id: '2', title: 'Twitter', clicks: 189 },
    { id: '3', title: 'GitHub', clicks: 144 },
  ];

  return (
    <div className="max-w-4xl">
      <h1 className="text-2xl font-bold mb-6">Analytics</h1>

      {/* Date Range */}
      <div className="flex gap-2 mb-6">
        {dateRanges.map((r) => (
          <button
            key={r.id}
            onClick={() => setRange(r.id)}
            className={`px-4 py-2 rounded-lg transition ${
              range === r.id
                ? 'bg-purple-600 text-white'
                : 'bg-white border border-gray-200 hover:bg-gray-50'
            }`}
          >
            {r.label}
          </button>
        ))}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <p className="text-sm text-gray-500 mb-1">Total Views</p>
          <p className="text-3xl font-bold">{stats.views.toLocaleString()}</p>
          <p
            className={`text-sm ${
              stats.viewsChange >= 0 ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {stats.viewsChange >= 0 ? '+' : ''}
            {stats.viewsChange}%
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <p className="text-sm text-gray-500 mb-1">Total Clicks</p>
          <p className="text-3xl font-bold">{stats.clicks.toLocaleString()}</p>
          <p
            className={`text-sm ${
              stats.clicksChange >= 0 ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {stats.clicksChange >= 0 ? '+' : ''}
            {stats.clicksChange}%
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <p className="text-sm text-gray-500 mb-1">CTR</p>
          <p className="text-3xl font-bold">{stats.ctr}%</p>
          <p className="text-sm text-gray-400">Click-through rate</p>
        </div>
      </div>

      {/* Top Links */}
      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <h2 className="text-lg font-semibold mb-4">Top Performing Links</h2>

        <div className="space-y-3">
          {topLinks.map((link, index) => (
            <div
              key={link.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center gap-4">
                <span className="w-8 h-8 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center font-semibold">
                  {index + 1}
                </span>
                <span className="font-medium">{link.title}</span>
              </div>
              <span className="font-semibold">{link.clicks} clicks</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
