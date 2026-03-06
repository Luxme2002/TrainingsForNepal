
-- =============================================
-- COURSES TABLE
-- =============================================
CREATE TABLE public.courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  icon text DEFAULT '📚',
  fee text DEFAULT 'NPR 0',
  trainer_id uuid,
  trainer_name text,
  status text DEFAULT 'active',
  total_lessons integer DEFAULT 0,
  rating numeric(3,1) DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view courses" ON public.courses
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Admins can manage courses" ON public.courses
  FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Trainers can update own courses" ON public.courses
  FOR UPDATE TO authenticated USING (trainer_id = auth.uid());

-- =============================================
-- ENROLLMENTS TABLE
-- =============================================
CREATE TABLE public.enrollments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid NOT NULL,
  course_id uuid REFERENCES public.courses(id) ON DELETE CASCADE NOT NULL,
  progress integer DEFAULT 0,
  completed_lessons integer DEFAULT 0,
  status text DEFAULT 'active',
  enrolled_at timestamptz DEFAULT now(),
  UNIQUE (student_id, course_id)
);

ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students can view own enrollments" ON public.enrollments
  FOR SELECT TO authenticated USING (student_id = auth.uid());

CREATE POLICY "Admins can manage enrollments" ON public.enrollments
  FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Trainers can view enrollments for their courses" ON public.enrollments
  FOR SELECT TO authenticated USING (
    EXISTS (SELECT 1 FROM public.courses WHERE courses.id = course_id AND courses.trainer_id = auth.uid())
  );

-- =============================================
-- ASSIGNMENTS TABLE
-- =============================================
CREATE TABLE public.assignments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id uuid REFERENCES public.courses(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  description text,
  due_date timestamptz,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.assignments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enrolled students can view assignments" ON public.assignments
  FOR SELECT TO authenticated USING (
    EXISTS (SELECT 1 FROM public.enrollments WHERE enrollments.course_id = assignments.course_id AND enrollments.student_id = auth.uid())
  );

CREATE POLICY "Trainers can manage assignments for their courses" ON public.assignments
  FOR ALL TO authenticated USING (
    EXISTS (SELECT 1 FROM public.courses WHERE courses.id = course_id AND courses.trainer_id = auth.uid())
  );

CREATE POLICY "Admins can manage all assignments" ON public.assignments
  FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- =============================================
-- ASSIGNMENT SUBMISSIONS TABLE
-- =============================================
CREATE TABLE public.assignment_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  assignment_id uuid REFERENCES public.assignments(id) ON DELETE CASCADE NOT NULL,
  student_id uuid NOT NULL,
  status text DEFAULT 'pending',
  grade text,
  feedback text,
  submitted_at timestamptz DEFAULT now(),
  UNIQUE (assignment_id, student_id)
);

ALTER TABLE public.assignment_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students can view own submissions" ON public.assignment_submissions
  FOR SELECT TO authenticated USING (student_id = auth.uid());

CREATE POLICY "Students can insert own submissions" ON public.assignment_submissions
  FOR INSERT TO authenticated WITH CHECK (student_id = auth.uid());

CREATE POLICY "Students can update own pending submissions" ON public.assignment_submissions
  FOR UPDATE TO authenticated USING (student_id = auth.uid() AND status = 'pending');

CREATE POLICY "Trainers can manage submissions for their courses" ON public.assignment_submissions
  FOR ALL TO authenticated USING (
    EXISTS (
      SELECT 1 FROM public.assignments a
      JOIN public.courses c ON c.id = a.course_id
      WHERE a.id = assignment_id AND c.trainer_id = auth.uid()
    )
  );

CREATE POLICY "Admins can manage all submissions" ON public.assignment_submissions
  FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- =============================================
-- CERTIFICATES TABLE
-- =============================================
CREATE TABLE public.certificates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid NOT NULL,
  course_id uuid REFERENCES public.courses(id),
  title text NOT NULL,
  certificate_code text UNIQUE,
  issued_at timestamptz DEFAULT now()
);

ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students can view own certificates" ON public.certificates
  FOR SELECT TO authenticated USING (student_id = auth.uid());

CREATE POLICY "Admins can manage certificates" ON public.certificates
  FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- =============================================
-- SESSIONS TABLE
-- =============================================
CREATE TABLE public.sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id uuid REFERENCES public.courses(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  topic text,
  session_date date,
  start_time time,
  end_time time,
  room text,
  batch text,
  session_type text DEFAULT 'class',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view sessions" ON public.sessions
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Admins can manage sessions" ON public.sessions
  FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Trainers can manage sessions for their courses" ON public.sessions
  FOR ALL TO authenticated USING (
    EXISTS (SELECT 1 FROM public.courses WHERE courses.id = course_id AND courses.trainer_id = auth.uid())
  );

-- =============================================
-- TRIGGERS for updated_at
-- =============================================
CREATE TRIGGER update_courses_updated_at BEFORE UPDATE ON public.courses
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
