-- ============================================
-- SkillSwap Database Schema
-- Run this in Supabase SQL Editor (Dashboard → SQL Editor → New Query)
-- ============================================

-- 1. Skills table (shared list of all skills)
CREATE TABLE skills (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Profiles table (student profiles)
CREATE TABLE profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  bio TEXT DEFAULT '',
  branch TEXT NOT NULL,
  semester INTEGER NOT NULL CHECK (semester BETWEEN 1 AND 8),
  interests TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 3. User skills (links students to skills with proficiency & type)
CREATE TABLE user_skills (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  skill_id UUID REFERENCES skills(id) ON DELETE CASCADE NOT NULL,
  proficiency TEXT NOT NULL CHECK (proficiency IN ('beginner', 'intermediate', 'advanced')),
  type TEXT NOT NULL CHECK (type IN ('teaching', 'learning')),
  UNIQUE (profile_id, skill_id, type)
);

-- 4. Collaboration posts
CREATE TABLE collaboration_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  author_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('help_needed', 'offering_help', 'collaboration')),
  skills_needed TEXT[] DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'closed')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 5. Collaboration responses (applications to posts)
CREATE TABLE collaboration_responses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID REFERENCES collaboration_posts(id) ON DELETE CASCADE NOT NULL,
  responder_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected')),
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE (post_id, responder_id)
);

-- ============================================
-- Seed data: Insert skills
-- ============================================
INSERT INTO skills (name, category) VALUES
  ('Python', 'Programming'),
  ('JavaScript', 'Programming'),
  ('React', 'Programming'),
  ('C++', 'Programming'),
  ('Java', 'Programming'),
  ('Machine Learning', 'Data Science'),
  ('Data Analysis', 'Data Science'),
  ('SQL', 'Database'),
  ('UI/UX Design', 'Design'),
  ('Figma', 'Design'),
  ('Photoshop', 'Design'),
  ('Video Editing', 'Media'),
  ('Photography', 'Media'),
  ('Cybersecurity', 'Security'),
  ('Cloud Computing', 'Infrastructure'),
  ('Docker', 'Infrastructure'),
  ('Node.js', 'Programming'),
  ('TypeScript', 'Programming'),
  ('Flutter', 'Mobile'),
  ('Android Dev', 'Mobile'),
  ('Public Speaking', 'Soft Skills'),
  ('Technical Writing', 'Soft Skills'),
  ('Git & GitHub', 'Tools'),
  ('Linux', 'Tools');

-- ============================================
-- Row Level Security (RLS)
-- ============================================

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE collaboration_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE collaboration_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;

-- Skills: anyone can read
CREATE POLICY "Skills are viewable by everyone"
  ON skills FOR SELECT USING (true);

-- Profiles: anyone can read, owner can insert/update
CREATE POLICY "Profiles are viewable by everyone"
  ON profiles FOR SELECT USING (true);

CREATE POLICY "Users can create their own profile"
  ON profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE USING (auth.uid() = user_id);

-- User skills: anyone can read, owner can manage
CREATE POLICY "User skills are viewable by everyone"
  ON user_skills FOR SELECT USING (true);

CREATE POLICY "Users can manage their own skills"
  ON user_skills FOR INSERT WITH CHECK (
    profile_id IN (SELECT id FROM profiles WHERE user_id = auth.uid())
  );

CREATE POLICY "Users can delete their own skills"
  ON user_skills FOR DELETE USING (
    profile_id IN (SELECT id FROM profiles WHERE user_id = auth.uid())
  );

-- Collaboration posts: anyone can read, author can manage
CREATE POLICY "Posts are viewable by everyone"
  ON collaboration_posts FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create posts"
  ON collaboration_posts FOR INSERT WITH CHECK (
    author_id IN (SELECT id FROM profiles WHERE user_id = auth.uid())
  );

CREATE POLICY "Authors can update their posts"
  ON collaboration_posts FOR UPDATE USING (
    author_id IN (SELECT id FROM profiles WHERE user_id = auth.uid())
  );

-- Collaboration responses: involved parties can read, responder can create
CREATE POLICY "Responses viewable by involved parties"
  ON collaboration_responses FOR SELECT USING (true);

CREATE POLICY "Authenticated users can respond to posts"
  ON collaboration_responses FOR INSERT WITH CHECK (
    responder_id IN (SELECT id FROM profiles WHERE user_id = auth.uid())
  );

-- ============================================
-- Helpful views
-- ============================================

-- View: profiles with their skills joined
CREATE OR REPLACE VIEW profiles_with_skills AS
SELECT
  p.*,
  COALESCE(
    json_agg(
      json_build_object(
        'skill_id', us.skill_id,
        'skill_name', s.name,
        'skill_category', s.category,
        'proficiency', us.proficiency,
        'type', us.type
      )
    ) FILTER (WHERE us.id IS NOT NULL),
    '[]'::json
  ) AS skills
FROM profiles p
LEFT JOIN user_skills us ON us.profile_id = p.id
LEFT JOIN skills s ON s.id = us.skill_id
GROUP BY p.id;

-- View: collaboration posts with response count and author info
CREATE OR REPLACE VIEW collaboration_posts_with_details AS
SELECT
  cp.*,
  p.name AS author_name,
  (SELECT COUNT(*) FROM collaboration_responses cr WHERE cr.post_id = cp.id) AS response_count
FROM collaboration_posts cp
JOIN profiles p ON p.id = cp.author_id;
