Product Requirements Document (PRD)
**Project Name:** DraftRecon  
**Version:** MVP v0.1  
**Owner:** Michail  
**Date:** June 2025  

---

## 🔹 1. Overview

**DraftRecon** is a high-signal, low-noise scouting platform where AI-assisted builders and automation pros showcase their work on “player cards.” Instead of job applications, companies *scout and draft* talent based on what they’ve built.

The MVP flips the hiring model by starting with builder visibility, not resumes.

---

## 🔹 2. Goals

- Enable talent to create and publish scouting cards that showcase what they’ve built.
- Allow companies to view and save talent cards without traditional job posts.
- Keep the platform private, clean, and non-social.

---

## 🔹 3. User Roles

| Role      | Description                                         |
|-----------|-----------------------------------------------------|
| Talent    | AI builders, automation pros, indie devs            |
| Recruiter | Startup founders, hiring managers, technical scouts |
| Admin     | Michail (can manage content, flag users, view data) |

---

## 🔹 4. Core Features (MVP)

### ✳️ Talent Side
- [ ] Sign up / login (Supabase Auth)
- [ ] Create & edit profile (aka Player Card):
  - Name, bio, skills (tags), tools (tags), project links (JSON)
  - Optional avatar or demo screenshot
- [ ] Publish/unpublish their profile

### ✳️ Recruiter Side
- [ ] Sign up / login
- [ ] Browse public player cards
- [ ] Filter by skills, tools
- [ ] Save profiles to “shortlist”

### ✳️ Admin Dashboard
- [ ] View all user profiles and companies
- [ ] Flag inappropriate content (manual for now)

---

## 🔹 5. Tech Stack

| Component     | Tech/Platform               |
|---------------|-----------------------------|
| Frontend      | Next.js (TypeScript)         |
| Backend/Auth  | Supabase                    |
| Hosting       | Vercel                      |
| Email         | Postmark (welcome/contact) |
| Dev IDE       | Cursor.com                  |
| Versioning    | GitHub                      |

---

## 🔹 6. Database Schema (Initial)

### `profiles` table

| Field       | Type         | Notes                     |
|-------------|--------------|---------------------------|
| id          | UUID (PK)    | Matches Supabase user ID  |
| full_name   | Text         | Talent name               |
| bio         | Text         | Short bio                 |
| skills      | Text[]       | Skill tags                |
| tools       | Text[]       | Tools used                |
| projects    | JSONB        | Links, summaries, demos   |
| avatar_url  | Text         | Profile image (optional)  |
| role        | Text         | Default = "talent"        |
| created_at  | Timestamp    | Default now()             |

### `companies` table

| Field               | Type         | Notes                |
|---------------------|--------------|----------------------|
| id                  | UUID (PK)    | Matches Supabase user ID |
| company_name        | Text         |                      |
| description         | Text         |                      |
| website             | Text         |                      |
| subscription_status | Text         | Default = "free"     |
| created_at          | Timestamp    |                      |

### `shortlists` table

| Field        | Type      | Notes                           |
|--------------|-----------|---------------------------------|
| id           | UUID (PK) |                                 |
| recruiter_id | UUID      | References `auth.users(id)`     |
| player_id    | UUID      | References `profiles(id)`       |
| created_at   | Timestamp | Default now()                   |

---

## 🔹 7. Security & RLS

- Enable Supabase Row-Level Security (RLS)
- Policies:
  - Talent can only edit their own profiles
  - Everyone can read published profiles
  - Recruiters can only view their own shortlists

---

## 🔹 8. Timeline (Proposed)

| Week | Milestone                              |
|------|----------------------------------------|
| 1    | Supabase schema + Auth wired to Cursor |
| 2    | Profile builder + public card browser  |
| 3    | Recruiter dashboard + shortlist        |
| 4    | Admin view + polish + deploy to Vercel |

---

## 🔹 9. Future Features (Post-MVP)

- AI-powered profile tagging and matching (Gemini)
- Stripe paywall for recruiters
- Messaging/contact form
- Invite-only beta with referral codes.gitignore
# Node.js
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
