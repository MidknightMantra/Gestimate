# Gestimate - Your Smart Pregnancy Companion

A professional pregnancy tracking application built with modern technologies.

## 🚀 Features

- **Pregnancy Calculator** - 5 calculation methods including IVF support
- **Kick Counter** - Track baby movements with analytics
- **Weight Tracker** - Monitor weight gain with charts
- **Symptom Logger** - Log and visualize symptoms
- **Contraction Timer** - Labor tracking with 5-1-1 rule
- **Bump Gallery** - Photo timeline storage
- **Appointments** - Prenatal visit management
- **Hospital Bag** - Comprehensive checklist
- **Birth Plan** - Document preferences
- **Baby Names** - Organize name ideas
- **Data Export** - CSV and summary exports
- **Milestone Cards** - Shareable social media images

## 📦 Project Structure

```
gestimate/
├── apps/
│   ├── web/          # Next.js 15 web application
│   └── mobile/       # React Native (Expo) mobile app
├── packages/
│   ├── core/         # Shared business logic
│   ├── ui/           # Shared UI components
│   └── config/       # Shared configurations
└── package.json      # Root monorepo config
```

## 🛠️ Tech Stack

- **Monorepo**: Turborepo + npm workspaces
- **Web**: Next.js 15, React 19, Tailwind CSS
- **Mobile**: React Native, Expo SDK 52
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **Charts**: Recharts
- **Language**: TypeScript 5.8

## 🏁 Quick Start

```bash
# Install dependencies
npm install

# Start development
npm run dev

# Build for production
npm run build
```

## 📁 Environment Variables

Create `.env.local` in `apps/web/`:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 📜 License

MIT © Gestimate
