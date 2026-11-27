CREATE TABLE public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text NOT NULL DEFAULT '' CHECK (char_length(full_name) <= 120),
  headline text NOT NULL DEFAULT '' CHECK (char_length(headline) <= 160),
  bio text NOT NULL DEFAULT '' CHECK (char_length(bio) <= 1500),
  portfolio_public boolean NOT NULL DEFAULT false,
  consent_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.profiles TO authenticated;
GRANT SELECT ON public.profiles TO anon;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "View own or shared profiles" ON public.profiles FOR SELECT TO anon, authenticated
  USING (portfolio_public OR id = (select auth.uid()));
CREATE POLICY "Create own profile" ON public.profiles FOR INSERT TO authenticated
  WITH CHECK (id = (select auth.uid()));
CREATE POLICY "Update own profile" ON public.profiles FOR UPDATE TO authenticated
  USING (id = (select auth.uid())) WITH CHECK (id = (select auth.uid()));
CREATE POLICY "Delete own profile" ON public.profiles FOR DELETE TO authenticated
  USING (id = (select auth.uid()));

CREATE TABLE public.skill_assessments (
  user_id uuid PRIMARY KEY,
  answers jsonb NOT NULL DEFAULT '{}'::jsonb,
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.skill_assessments TO authenticated;
GRANT ALL ON public.skill_assessments TO service_role;
ALTER TABLE public.skill_assessments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Read own assessment" ON public.skill_assessments FOR SELECT TO authenticated USING (user_id = (select auth.uid()));
CREATE POLICY "Create own assessment" ON public.skill_assessments FOR INSERT TO authenticated WITH CHECK (user_id = (select auth.uid()));
CREATE POLICY "Update own assessment" ON public.skill_assessments FOR UPDATE TO authenticated USING (user_id = (select auth.uid())) WITH CHECK (user_id = (select auth.uid()));
CREATE POLICY "Delete own assessment" ON public.skill_assessments FOR DELETE TO authenticated USING (user_id = (select auth.uid()));

CREATE TABLE public.completed_activities (
  user_id uuid NOT NULL,
  activity_id text NOT NULL CHECK (char_length(activity_id) <= 80),
  completed_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, activity_id)
);
GRANT SELECT, INSERT, DELETE ON public.completed_activities TO authenticated;
GRANT ALL ON public.completed_activities TO service_role;
ALTER TABLE public.completed_activities ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Read own completed" ON public.completed_activities FOR SELECT TO authenticated USING (user_id = (select auth.uid()));
CREATE POLICY "Add own completed" ON public.completed_activities FOR INSERT TO authenticated WITH CHECK (user_id = (select auth.uid()));
CREATE POLICY "Remove own completed" ON public.completed_activities FOR DELETE TO authenticated USING (user_id = (select auth.uid()));

CREATE TABLE public.portfolio_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title text NOT NULL CHECK (char_length(title) BETWEEN 1 AND 140),
  description text NOT NULL DEFAULT '' CHECK (char_length(description) <= 1500),
  link text NOT NULL DEFAULT '' CHECK (char_length(link) <= 500),
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX portfolio_items_user_idx ON public.portfolio_items (user_id, created_at DESC);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.portfolio_items TO authenticated;
GRANT SELECT ON public.portfolio_items TO anon;
GRANT ALL ON public.portfolio_items TO service_role;
ALTER TABLE public.portfolio_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "View own or shared items" ON public.portfolio_items FOR SELECT TO anon, authenticated
  USING (user_id = (select auth.uid()) OR user_id IN (SELECT id FROM public.profiles WHERE portfolio_public));
CREATE POLICY "Add own items" ON public.portfolio_items FOR INSERT TO authenticated WITH CHECK (user_id = (select auth.uid()));
CREATE POLICY "Update own items" ON public.portfolio_items FOR UPDATE TO authenticated USING (user_id = (select auth.uid())) WITH CHECK (user_id = (select auth.uid()));
CREATE POLICY "Delete own items" ON public.portfolio_items FOR DELETE TO authenticated USING (user_id = (select auth.uid()));

CREATE TABLE public.opportunities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  kind text NOT NULL CHECK (kind IN ('job','internship','scholarship','training','volunteering','freelance')),
  title text NOT NULL,
  organization text NOT NULL,
  summary text NOT NULL DEFAULT '',
  location text NOT NULL DEFAULT '',
  deadline date,
  apply_url text NOT NULL DEFAULT '',
  verified boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.opportunities TO anon, authenticated;
GRANT ALL ON public.opportunities TO service_role;
ALTER TABLE public.opportunities ENABLE ROW LEVEL SECURITY;
CREATE POLICY "View verified opportunities" ON public.opportunities FOR SELECT TO anon, authenticated USING (verified);

CREATE TABLE public.saved_opportunities (
  user_id uuid NOT NULL,
  opportunity_id uuid NOT NULL REFERENCES public.opportunities(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, opportunity_id)
);
CREATE INDEX saved_opportunities_opp_idx ON public.saved_opportunities (opportunity_id);
GRANT SELECT, INSERT, DELETE ON public.saved_opportunities TO authenticated;
GRANT ALL ON public.saved_opportunities TO service_role;
ALTER TABLE public.saved_opportunities ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Read own saved" ON public.saved_opportunities FOR SELECT TO authenticated USING (user_id = (select auth.uid()));
CREATE POLICY "Add own saved" ON public.saved_opportunities FOR INSERT TO authenticated WITH CHECK (user_id = (select auth.uid()));
CREATE POLICY "Remove own saved" ON public.saved_opportunities FOR DELETE TO authenticated USING (user_id = (select auth.uid()));

CREATE TABLE public.mentors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  role_title text NOT NULL DEFAULT '',
  organization text NOT NULL DEFAULT '',
  expertise text NOT NULL DEFAULT '',
  bio text NOT NULL DEFAULT '',
  verified boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.mentors TO anon, authenticated;
GRANT ALL ON public.mentors TO service_role;
ALTER TABLE public.mentors ENABLE ROW LEVEL SECURITY;
CREATE POLICY "View verified mentors" ON public.mentors FOR SELECT TO anon, authenticated USING (verified);

CREATE TABLE public.mentor_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  mentor_id uuid NOT NULL REFERENCES public.mentors(id) ON DELETE CASCADE,
  message text NOT NULL CHECK (char_length(message) BETWEEN 1 AND 1000),
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, mentor_id)
);
CREATE INDEX mentor_requests_mentor_idx ON public.mentor_requests (mentor_id);
GRANT SELECT, INSERT, DELETE ON public.mentor_requests TO authenticated;
GRANT ALL ON public.mentor_requests TO service_role;
ALTER TABLE public.mentor_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Read own requests" ON public.mentor_requests FOR SELECT TO authenticated USING (user_id = (select auth.uid()));
CREATE POLICY "Send own requests" ON public.mentor_requests FOR INSERT TO authenticated WITH CHECK (user_id = (select auth.uid()));
CREATE POLICY "Withdraw own requests" ON public.mentor_requests FOR DELETE TO authenticated USING (user_id = (select auth.uid()));