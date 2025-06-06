# DraftRecon

A high-signal, low-noise scouting platform where AI-assisted builders and automation pros showcase their work on "player cards." Instead of job applications, companies scout and draft talent based on what they've built.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Supabase account
- Vercel account (for deployment)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/draftrecon.git
cd draftrecon
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory with your Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS
- **Backend/Auth**: Supabase
- **Hosting**: Vercel
- **Email**: Postmark

## 📁 Project Structure

```
draftrecon/
├── app/                 # Next.js app directory
├── components/          # Reusable React components
├── lib/                 # Utility functions and Supabase client
├── public/             # Static assets
└── types/              # TypeScript type definitions
```

## 🔐 Environment Variables

Create a `.env.local` file with the following variables:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 📝 License

This project is proprietary and confidential.

## 👥 Contributing

This is a private project. Please contact the owner for contribution guidelines. 