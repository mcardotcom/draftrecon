🔐 DraftRecon Security & Access Control (MVP)
**Version:** v0.1  
**Owner:** Michail  
**Date:** June 2025  

---

## 🔹 1. Authentication

**Platform:** Supabase Auth  
**Enabled Methods:**
- ✅ Email Magic Link (default)
- ⬜ OAuth (GitHub, Google – optional post-MVP)

### 🔑 Auth Roles

| Role      | Access                                      |
|-----------|---------------------------------------------|
| Talent    | Read/write their own `profile`              |
| Recruiter | Read `profiles`, write their own `shortlist`|
| Public    | Browse published player cards only          |
| Admin     | (Manual control via Supabase or future role)

---

## 🔹 2. Row-Level Security (RLS)

Enable **RLS** for each table:  
Supabase → Table → RLS → Enable

---

### ✅ `profiles` table

```sql
-- Talent can view their own profile
create policy "Talent can read own profile"
on profiles for select using (auth.uid() = id);

-- Public can view all profiles
create policy "Anyone can read published profiles"
on profiles for select using (true);

-- Talent can update their own profile
create policy "Talent can update own profile"
on profiles for update using (auth.uid() = id);
