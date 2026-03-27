'use client';

import { useState } from 'react';

const dateRanges = [
  { id: '7d', label: 'Last 7 days' },
  { id: '30d', label: 'Last 30 days' },
  { id: '90d', label: 'Last 90 days' },
  { id: 'all', label: 'All time' },
];

// New account - same data across all ranges (account is less than 7 days old)
const statsData = {
  views: 48,
  clicks: 23,
  ctr: 47.9,
  viewsChange: 0,
  clicksChange: 0,
};

const topLinksData = [
  { id: '1', title: 'YouTube', clicks: 12 },
  { id: '2', title: 'Instagram', clicks: 8 },
  { id: '3', title: 'X', clicks: 3 },
];

const activityData = [
  { day: 'M', height: 35 },
  { day: 'T', height: 55 },
  { day: 'W', height: 45 },
  { day: 'T', height: 70 },
  { day: 'F', height: 85 },
  { day: 'S', height: 50 },
  { day: 'S', height: 40 },
];

export default function AnalyticsPage() {
  const [range, setRange] = useState('7d');

  const totalClicks = topLinksData.reduce((sum, link) => sum + link.clicks, 0);

  return (
    <div className="max-w-4xl">
      <h1 className="text-2xl font-bold mb-6">Insights</h1>

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
          <p className="text-3xl font-bold">{statsData.views}</p>
          <p className="text-sm text-gray-400">Since you started</p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <p className="text-sm text-gray-500 mb-1">Total Clicks</p>
          <p className="text-3xl font-bold">{statsData.clicks}</p>
          <p className="text-sm text-gray-400">Engagement</p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <p className="text-sm text-gray-500 mb-1">CTR</p>
          <p className="text-3xl font-bold">{statsData.ctr}%</p>
          <p className="text-sm text-gray-400">Click-through rate</p>
        </div>
      </div>

      {/* Top Links */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 mb-6">
        <h2 className="text-lg font-semibold mb-4">Top Performing Links</h2>

        <div className="space-y-3">
          {topLinksData.map((link, index) => {
            const percentage = totalClicks > 0 ? (link.clicks / totalClicks) * 100 : 0;
            return (
              <div
                key={link.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center gap-4 flex-1">
                  <span className="w-8 h-8 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center font-semibold text-sm">
                    {index + 1}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium">{link.title}</span>
                      <span className="font-semibold text-sm">{link.clicks} clicks</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-purple-500 rounded-full"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Activity Chart */}
      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <h2 className="text-lg font-semibold mb-4">Activity Overview</h2>
        <div className="flex items-end justify-between h-32 gap-2">
          {activityData.map((item, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-2">
              <div 
                className={`w-full rounded-t ${
                  item.height > 60 ? 'bg-purple-500' : 'bg-purple-200'
                }`}
                style={{ height: `${item.height}%` }}
              />
              <span className="text-xs text-gray-400">{item.day}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
