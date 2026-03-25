# Linktree Clone - Design Specification

**Date:** 2026-03-25  
**Project:** saas/linktree  
**Status:** Design Approved

---

## 1. Overview

A Linktree clone providing users with a single-page profile containing multiple links, customizable themes, and analytics. Users authenticate via Google OAuth and manage their profile through an admin dashboard.

### Core Features
- Google OAuth authentication
- Public profile page (`/[username]`)
- Admin dashboard with three tabs: Links, Appearance, Analytics
- Drag-and-drop link management
- Theme customization (presets + custom colors)
- Click analytics tracking

---

## 2. Architecture

### Tech Stack
| Layer | Technology |
|-------|------------|
| Frontend | Next.js 15 (App Router), React 19, TypeScript |
| Styling | Tailwind CSS 4, Shadcn/UI components |
| State Management | React Query (TanStack Query), Zustand |
| Backend API | Express.js 5 |
| Authentication | Firebase Auth (Google OAuth) |
| Database | Firebase Firestore |
| Drag & Drop | @dnd-kit/sortable |

### Directory Structure
```
saas/linktree/
├── apps/
│   ├── web/                    # Next.js frontend
│   │   ├── src/
│   │   │   ├── app/
│   │   │   │   ├── login/
│   │   │   │   ├── admin/
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   ├── layout.tsx
│   │   │   │   │   ├── links-tab.tsx
│   │   │   │   │   ├── appearance-tab.tsx
│   │   │   │   │   └── analytics-tab.tsx
│   │   │   │   ├── [username]/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── layout.tsx
│   │   │   │   └── page.tsx
│   │   │   ├── components/
│   │   │   │   ├── ui/         # Shadcn components
│   │   │   │   ├── link-card.tsx
│   │   │   │   ├── mobile-preview.tsx
│   │   │   │   ├── theme-selector.tsx
│   │   │   │   └── analytics-chart.tsx
│   │   │   ├── hooks/
│   │   │   │   ├── use-auth.ts
│   │   │   │   ├── use-links.ts
│   │   │   │   └── use-analytics.ts
│   │   │   ├── lib/
│   │   │   │   ├── firebase.ts
│   │   │   │   └── utils.ts
│   │   │   └── types/
│   │   │       └── index.ts
│   │   ├── public/
│   │   ├── next.config.js
│   │   ├── tailwind.config.ts
│   │   └── package.json
│   └── api/                    # Express backend
│       ├── src/
│       │   ├── routes/
│       │   │   ├── analytics.ts
│       │   │   └── links.ts
│       │   ├── middleware/
│       │   │   └── auth.ts
│       │   ├── services/
│       │   │   └── firebase.ts
│       │   └── index.ts
│       └── package.json
├── packages/
│   └── shared/                 # Shared types/utilities
│       ├── src/
│       │   └── types.ts
│       └── package.json
├── package.json
└── turbo.json
```

---

## 3. Data Models

### User (Firestore Collection: `users`)
```typescript
interface User {
  uid: string;              // Firebase Auth UID
  email: string;
  username: string;         // Unique, URL-friendly
  displayName: string;
  bio: string;
  avatarUrl: string;
  theme: Theme;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

interface Theme {
  preset: 'minimal' | 'gradient' | 'image' | 'custom';
  backgroundColor: string;   // hex
  buttonColor: string;       // hex
  buttonTextColor: string;   // hex
  fontFamily: 'inter' | 'roboto' | 'poppins' | 'playfair';
  backgroundImage?: string;  // URL for image theme
}
```

### Link (Firestore Collection: `links`)
```typescript
interface Link {
  id: string;
  userId: string;           // Reference to users.uid
  title: string;
  url: string;
  isActive: boolean;
  order: number;            // For sorting
  clickCount: number;       // Aggregated count
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

### Analytics (Firestore Collection: `analytics`)
```typescript
interface Analytics {
  id: string;
  userId: string;
  linkId: string;
  date: string;             // YYYY-MM-DD format
  clicks: number;
}

interface DailyStats {
  date: string;
  pageViews: number;
  totalClicks: number;
  linkBreakdown: { linkId: string; clicks: number }[];
}
```

---

## 4. Pages & Components

### 4.1 Login Page (`/login`)
- Centered card layout
- Google OAuth button (primary CTA)
- Linktree branding/logo
- Redirects to `/admin` after successful auth

### 4.2 Admin Dashboard (`/admin`)
**Layout:**
- Fixed left sidebar (280px width)
- Main content area (flexible)
- Mobile preview panel (right side, collapsible on mobile)

**Sidebar Navigation:**
- App logo/branding
- Tab buttons: Links, Appearance, Analytics
- User profile summary (avatar, name)
- Logout button

#### Links Tab
- **Header:** "Add Link" button (purple, prominent)
- **Link List:** Sortable vertical list
  - Each card contains:
    - Drag handle (left side)
    - Title input field
    - URL input field
    - Toggle switch (active/inactive)
    - Click count badge
    - Delete button (ellipsis menu)
  - Empty state: "Add your first link" illustration

#### Appearance Tab
- **Profile Section:**
  - Avatar upload (click to upload, preview shown)
  - Display name input
  - Bio textarea (max 160 chars)
  
- **Theme Section:**
  - Preset grid (4 options: Minimal, Gradient, Image, Custom)
  - Color pickers (background, button, button text)
  - Font dropdown selector
  - Background image upload (only for Image preset)

#### Analytics Tab
- **Date Range Picker:** Last 7 days, 30 days, 90 days, All time
- **Stats Cards:**
  - Total Views (with % change)
  - Total Clicks (with % change)
  - CTR (click-through rate)
- **Charts:**
  - Line chart: Views over time
  - Bar chart: Top performing links
- **Links Table:** Sortable by clicks, shows individual link performance

### 4.3 Public Profile Page (`/[username]`)
**Layout:**
- Full-height container
- Centered content (max-width 680px)
- Mobile-first responsive design

**Components:**
- Profile header: Avatar, display name, bio
- Link buttons: Stacked vertically, full-width
  - Hover effects based on theme
  - Click tracking (redirects via API for analytics)
- Footer: "Made with [AppName]" branding

---

## 5. API Endpoints

### Express API Routes

#### Analytics
```
POST   /api/analytics/track      # Track a click event
GET    /api/analytics/:userId    # Get analytics for user (with date range)
```

#### Links
```
GET    /api/links/:userId        # Get all links for user
POST   /api/links                # Create new link
PUT    /api/links/:id            # Update link
DELETE /api/links/:id            # Delete link
PATCH  /api/links/reorder        # Update link order
```

### Firebase Auth Middleware
- Verify Firebase ID token
- Attach `req.user` with uid and email

---

## 6. State Management

### React Query Keys
```typescript
['user', uid]           // User profile data
['links', uid]          // User's links
['analytics', uid, range] // Analytics data
```

### Zustand Stores
```typescript
// auth-store.ts
interface AuthState {
  user: FirebaseUser | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

// theme-store.ts
interface ThemeState {
  previewTheme: Theme;
  setPreviewTheme: (theme: Theme) => void;
  resetPreview: () => void;
}
```

---

## 7. Security Rules

### Firestore Rules
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read/write their own data
    match /users/{userId} {
      allow read: if true;  // Public profiles
      allow write: if request.auth != null && request.auth.uid == userId;
    }
    
    match /links/{linkId} {
      allow read: if true;  // Public links
      allow write: if request.auth != null && request.auth.uid == resource.data.userId;
    }
    
    match /analytics/{docId} {
      allow read: if request.auth != null && request.auth.uid == resource.data.userId;
      allow write: if request.auth != null || request.resource.data.userId == resource.data.userId;
    }
  }
}
```

---

## 8. Error Handling

### Frontend
- Toast notifications for success/error feedback
- Form validation with inline errors
- Loading states for all async operations
- Error boundaries for component crashes

### Backend
- Structured error responses: `{ error: string, code: string }`
- HTTP status codes: 400 (bad request), 401 (unauthorized), 404 (not found), 500 (server error)
- Firebase error mapping to user-friendly messages

---

## 9. Testing Strategy

### Unit Tests
- Component rendering (React Testing Library)
- Hook behavior testing
- Utility function tests

### Integration Tests
- API endpoint testing (Supertest)
- Authentication flow testing
- CRUD operations for links

### E2E Tests
- User journey: Login → Add Link → View Profile → Check Analytics

---

## 10. Deployment

### Frontend (Vercel)
```bash
cd apps/web
vercel --prod
```

### Backend (Railway/Render)
```bash
cd apps/api
railway up
```

### Environment Variables
```env
# Frontend
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_API_URL=

# Backend
FIREBASE_SERVICE_ACCOUNT_KEY=
PORT=3001
```

---

## 11. Future Enhancements

- [ ] Custom domains
- [ ] Link scheduling (publish/unpublish at specific times)
- [ ] Social media embeds (preview cards)
- [ ] QR code generation for profiles
- [ ] Email/password authentication option
- [ ] Premium tiers (more themes, detailed analytics)

---

## Approval

**Design Status:** ✅ Approved by user on 2026-03-25  
**Next Step:** Create implementation plan via `writing-plans` skill
