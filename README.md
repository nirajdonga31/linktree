# Linktree Clone

Full-featured Linktree clone with Next.js 14, Firebase Authentication, drag-and-drop link management, and mobile preview.

## Features

- **Google OAuth Login** - Secure authentication via Firebase
- **Drag-and-Drop Links** - Reorder links easily with @dnd-kit
- **Mobile Preview** - See your profile in real-time as you edit
- **Theme Customization** - Colors, fonts, and background presets
- **Analytics Dashboard** - Track views and clicks
- **Public Profiles** - Shareable links like `yourdomain.com/username`

## Tech Stack

- **Frontend:** Next.js 14, React, TypeScript, Tailwind CSS, Zustand
- **Backend:** Express 5, Node.js
- **Auth:** Firebase Authentication (Google OAuth)
- **Database:** Firestore (configured)
- **Monorepo:** Turbo

## Getting Started

### 1. Clone and Install

```bash
git clone https://github.com/nirajdonga31/linktree.git
cd linktree
npm install
```

### 2. Environment Variables

Copy the example files and fill in your values:

```bash
cp apps/web/.env.example apps/web/.env.local
cp apps/api/.env.example apps/api/.env
```

**Frontend (.env.local):**
```
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_API_URL=http://localhost:3001
```

**Backend (.env):**
```
FIREBASE_SERVICE_ACCOUNT_KEY={}
PORT=3001
```

Get Firebase credentials from: https://console.firebase.google.com/

### 3. Run Development Servers

```bash
# Run both frontend and backend
npm run dev

# Or separately:
npm run dev --workspace=@linktree/web  # Frontend: http://localhost:3000
npm run dev --workspace=@linktree/api   # Backend: http://localhost:3001
```

## Project Structure

```
linktree/
├── apps/
│   ├── web/              # Next.js frontend
│   │   ├── src/app/      # Pages (Next.js App Router)
│   │   ├── src/components/
│   │   ├── src/hooks/    # useAuth, useLinks
│   │   └── src/lib/      # Firebase, API client
│   └── api/              # Express backend
│       └── src/routes/   # Links, Analytics
├── packages/
│   └── shared/           # TypeScript types
└── turbo.json            # Monorepo config
```

## Available Pages

- `/` - Landing page
- `/login` - Google OAuth login
- `/admin` - Links management (drag-and-drop)
- `/admin/appearance` - Theme customization
- `/admin/analytics` - Stats dashboard
- `/[username]` - Public profile page

## Deployment

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

## License

MIT
