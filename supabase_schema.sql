-- =========================================================================
-- Cəsarətoğlu MMC — Supabase SQL Schema for Cloud Database & Storage
-- Run this script in the Supabase Dashboard -> SQL Editor
-- =========================================================================

-- 1. Enable Row Level Security (RLS) and grant public read/write permissions for web app
-- -------------------------------------------------------------------------

-- 1. Products Table
CREATE TABLE IF NOT EXISTS public.products (
    id TEXT PRIMARY KEY,
    title_az TEXT,
    title_ru TEXT,
    title_en TEXT,
    partner TEXT,
    category TEXT,
    category_az TEXT,
    category_ru TEXT,
    category_en TEXT,
    artikul TEXT,
    image TEXT,
    image_local TEXT,
    description_az TEXT,
    description_ru TEXT,
    description_en TEXT,
    specs JSONB DEFAULT '[]'::jsonb,
    specs_structured JSONB DEFAULT '{}'::jsonb,
    status TEXT DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Partners Table
CREATE TABLE IF NOT EXISTS public.partners (
    id TEXT PRIMARY KEY,
    name TEXT,
    country TEXT,
    country_az TEXT,
    country_ru TEXT,
    country_en TEXT,
    status TEXT,
    status_az TEXT,
    status_ru TEXT,
    status_en TEXT,
    category TEXT,
    category_az TEXT,
    category_ru TEXT,
    category_en TEXT,
    logo TEXT,
    banner TEXT,
    description_az TEXT,
    description_ru TEXT,
    description_en TEXT,
    website TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Categories Table
CREATE TABLE IF NOT EXISTS public.categories (
    id TEXT PRIMARY KEY,
    title_az TEXT,
    title_ru TEXT,
    title_en TEXT,
    badge_az TEXT,
    badge_ru TEXT,
    badge_en TEXT,
    desc_az TEXT,
    desc_ru TEXT,
    desc_en TEXT,
    btn_az TEXT,
    btn_ru TEXT,
    btn_en TEXT,
    icon TEXT,
    image TEXT,
    badgeColor TEXT,
    brands JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. News Table
CREATE TABLE IF NOT EXISTS public.news (
    id TEXT PRIMARY KEY,
    date TEXT,
    title_az TEXT,
    title_ru TEXT,
    title_en TEXT,
    category_az TEXT,
    category_ru TEXT,
    category_en TEXT,
    excerpt_az TEXT,
    excerpt_ru TEXT,
    excerpt_en TEXT,
    content_az TEXT,
    content_ru TEXT,
    content_en TEXT,
    image TEXT,
    image_local TEXT,
    badge TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Team Members Table
CREATE TABLE IF NOT EXISTS public.team (
    id TEXT PRIMARY KEY,
    name_az TEXT,
    name_ru TEXT,
    name_en TEXT,
    role_az TEXT,
    role_ru TEXT,
    role_en TEXT,
    bio_az TEXT,
    bio_ru TEXT,
    bio_en TEXT,
    department TEXT,
    is_leader BOOLEAN DEFAULT FALSE,
    status TEXT DEFAULT 'active',
    image TEXT,
    image_local TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Departments Table
CREATE TABLE IF NOT EXISTS public.departments (
    id TEXT PRIMARY KEY,
    title_az TEXT,
    title_ru TEXT,
    title_en TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. About Page Texts Table (Singleton)
CREATE TABLE IF NOT EXISTS public.about (
    id TEXT PRIMARY KEY DEFAULT 'about_singleton',
    badge_az TEXT,
    badge_ru TEXT,
    badge_en TEXT,
    title_az TEXT,
    title_ru TEXT,
    title_en TEXT,
    subtitle_az TEXT,
    subtitle_ru TEXT,
    subtitle_en TEXT,
    lead_az TEXT,
    lead_ru TEXT,
    lead_en TEXT,
    quote_q_az TEXT,
    quote_q_ru TEXT,
    quote_q_en TEXT,
    quote_a_az TEXT,
    quote_a_ru TEXT,
    quote_a_en TEXT,
    delivery_az TEXT,
    delivery_ru TEXT,
    delivery_en TEXT,
    distributor_badge_az TEXT,
    distributor_badge_ru TEXT,
    distributor_badge_en TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. Global Settings Table (Singleton)
CREATE TABLE IF NOT EXISTS public.settings (
    id TEXT PRIMARY KEY DEFAULT 'settings_singleton',
    phone TEXT,
    phone_clean TEXT,
    email TEXT,
    address_az TEXT,
    address_ru TEXT,
    address_en TEXT,
    working_hours_az TEXT,
    working_hours_ru TEXT,
    working_hours_en TEXT,
    whatsapp TEXT,
    admin_password_hash TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =========================================================================
-- Enable Full Read & Write Access via Anon Key
-- =========================================================================

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.about ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read/write on products" ON public.products FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public read/write on partners" ON public.partners FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public read/write on categories" ON public.categories FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public read/write on news" ON public.news FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public read/write on team" ON public.team FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public read/write on departments" ON public.departments FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public read/write on about" ON public.about FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public read/write on settings" ON public.settings FOR ALL USING (true) WITH CHECK (true);
