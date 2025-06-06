DraftRecon Testing & Debugging Plan
**Version:** v0.1  
**Owner:** Michail  
**Date:** June 2025  

---

## 🔹 1. Testing Philosophy

- Test the **user flow**, not just the code
- Validate against **real data**, not mocks
- Keep it fast: use **manual and functional tests** in MVP
- Prevent edge case bugs: enforce **RLS, schema, and auth checks**

---

## 🔹 2. Manual Testing Checklist

### ✳️ Authentication
- [ ] Sign up via email (Talent + Recruiter roles)
- [ ] Log out / back in
- [ ] Block access to `/dashboard` if not logged in
- [ ] Block Recruiter from editing profiles

### ✳️ Profile Builder (Talent)
- [ ] Save basic info: name, bio, skills, tools
- [ ] Add/remove project links (JSON object)
- [ ] Publish/unpublish works
- [ ] Avatar preview renders correctly

### ✳️ Public Card Browser (Recruiter)
- [ ] Shows only published cards
- [ ] Filter by skills/tools
- [ ] Card links go to individual profile page
- [ ] Save to shortlist → persists in Supabase

### ✳️ Supabase RLS Policies
- [ ] Talent can only edit their own profile
- [ ] Recruiter can only read profiles
- [ ] Recruiter can only manage their own shortlists

---

## 🔹 3. Dev Tools & Debugging Tips

| Tool          | Usage                                        |
|---------------|----------------------------------------------|
| **Supabase Logs** | Realtime DB/auth logs (check for denials)   |
| **Browser Console** | Frontend errors, failed auth, 500s         |
| **Supabase SQL Editor** | Run SELECTs to validate user RLS access |
| **React DevTools** | Confirm state transitions, data loads       |
| **Tailwind Play** | Live-test component layout/styling           |

---

## 🔹 4. Error Handling (MVP)

- [ ] Show toast or inline messages on failed auth or save
- [ ] Gracefully handle empty states (no cards, no shortlist)
- [ ] Do not expose error trace to users — just messages

---

## 🔹 5. MVP Edge Cases

| Area             | Test Case                                       |
|------------------|-------------------------------------------------|
| Public Access     | Viewing player card without being logged in     |
| Broken Projects   | Invalid project link should not break UI        |
| Empty Profile     | No skills/tools added → show placeholder text   |
| Rapid Edits       | Spam saves on form → debounce if needed         |
| RLS Failures      | User tries to edit someone else’s data (403)    |

---

## 🔹 6. Post-MVP: Optional Automation

| Tool              | Purpose                       |
|-------------------|-------------------------------|
| **Playwright**    | E2E browser-based testing      |
| **Jest**          | Component/unit test coverage   |
| **Supabase Studio** | Manual DB inspection         |
| **Vercel Previews** | Auto preview of PR branches  |

---

## 🔹 7. Logging for Production

- Add Vercel log forwarding (if needed)
- Use console error logging for now (`console.error`)
- Future: Integrate logging/alerting tools like Sentry

---

## ✅ Summary

For MVP:
- Prioritize user path testing (auth → profile → browse → shortlist)
- Test on real Supabase data with RLS active
- Keep a manual checklist until features stabilize



Final Pre-Dev Suggestions
1. Folder Structure (Code Hygiene)
Use a clean structure for MVP:
bash
CopyEdit
/pages
  /dashboard
  /card/[id]
/components
  PlayerCard.tsx
  Sidebar.tsx
  CTAButton.tsx
/lib
  supabaseClient.ts
  utils.ts
2. Global Styles
•	Add tailwind.config.js branding settings (font family, primary colors)
•	Setup layout shell with navbar/sidebar early
________________________________________
🚀 Post-MVP Enhancements (Plan Ahead)
Area	Recommendation
🧠 AI Matching	Use Gemini to auto-tag skills from projects
💰 Stripe Billing	Charge recruiters per seat/month
📥 Contact Layer	Add in-app messaging or 3rd-party contact forms
🛡️ Role-Based UI	Admin dashboard, gated recruiter tools
🛎️ Waitlist	Convert early testers into first recruiters
📊 Analytics	Add Vercel or Plausible for usage insights
