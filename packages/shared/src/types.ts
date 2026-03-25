// User types
export interface User {
  uid: string;
  email: string;
  username: string;
  displayName: string;
  bio: string;
  avatarUrl: string;
  theme: Theme;
  createdAt: string;
  updatedAt: string;
}

export interface Theme {
  preset: 'minimal' | 'gradient' | 'image' | 'custom';
  backgroundColor: string;
  buttonColor: string;
  buttonTextColor: string;
  fontFamily: 'inter' | 'roboto' | 'poppins' | 'playfair';
  backgroundImage?: string;
}

// Link types
export interface Link {
  id: string;
  userId: string;
  title: string;
  url: string;
  isActive: boolean;
  order: number;
  clickCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateLinkInput {
  title: string;
  url: string;
}

export interface UpdateLinkInput {
  title?: string;
  url?: string;
  isActive?: boolean;
  order?: number;
}

// Analytics types
export interface Analytics {
  id: string;
  userId: string;
  linkId: string;
  date: string;
  clicks: number;
}

export interface DailyStats {
  date: string;
  pageViews: number;
  totalClicks: number;
  linkBreakdown: { linkId: string; clicks: number }[];
}

export interface AnalyticsSummary {
  totalViews: number;
  totalClicks: number;
  ctr: number;
  viewsChange: number;
  clicksChange: number;
}

// API Response types
export interface ApiResponse<T> {
  data?: T;
  error?: string;
  code?: string;
}
