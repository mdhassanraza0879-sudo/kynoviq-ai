# Kynoviq AI — Production Launch & Deployment Guide

This guide details how **Mohammad Hassan Raza** can host and deploy **Kynoviq AI** live to the internet with a custom domain (e.g. `kynoviq.ai`).

---

## 🚀 1. Deploying to Vercel (Recommended - Free Tier Available)

Vercel is the official platform created by the creators of Next.js and provides zero-config hosting with instant SSL certificates.

### Step-by-Step Instructions:

1. **Push your code to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of Kynoviq AI"
   git remote add origin https://github.com/your-username/kynoviq-ai.git
   git push -u origin main
   ```

2. **Connect to Vercel**:
   - Go to [Vercel.com](https://vercel.com) and log in with your GitHub account.
   - Click **"Add New"** → **"Project"**.
   - Select your `kynoviq-ai` repository.

3. **Configure Environment Variables in Vercel**:
   Add the following variables in Vercel project settings:
   - `DATABASE_URL`: Your production PostgreSQL URL (e.g. Vercel Postgres, Supabase, or Neon)
   - `NEXTAUTH_URL`: `https://your-domain.vercel.app` (or your custom domain)
   - `NEXTAUTH_SECRET`: A random 32-character secret key
   - `OPENAI_API_KEY`: Your live OpenAI API Key (`sk-proj-...`)
   - `OPENAI_MODEL`: `gpt-4o-mini`

4. **Click Deploy**:
   Vercel will build the project automatically. Within ~1 minute, your site will be live!

---

## 🗄️ 2. Production Database (PostgreSQL / Supabase / Neon)

For production web hosting, switch from SQLite to PostgreSQL:

1. Create a free PostgreSQL database at [Supabase.com](https://supabase.com) or [Neon.tech](https://neon.tech).
2. Copy your connection string:
   `postgresql://postgres:[PASSWORD]@db.[PROJECT].supabase.co:5432/postgres`
3. Update `prisma/schema.prisma`:
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```
4. Run migration in terminal:
   ```bash
   npx prisma db push
   ```

---

## 🔑 3. Connecting OpenAI API Key

To activate live OpenAI GPT models instead of local demo mode:
1. Go to [platform.openai.com/api-keys](https://platform.openai.com/api-keys).
2. Create a new Secret Key.
3. Paste it into your `.env` file:
   ```env
   OPENAI_API_KEY="sk-proj-..."
   ```

---

## 📋 Founder Support Summary
- **Founder**: Mohammad Hassan Raza
- **Official Email**: mdhassanraza0879@gmail.com
- **Direct Phone**: +91 7307670879
- **Platform**: Kynoviq AI Inc.
