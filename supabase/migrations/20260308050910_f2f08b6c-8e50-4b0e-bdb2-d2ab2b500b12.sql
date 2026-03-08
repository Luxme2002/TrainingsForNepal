
CREATE TABLE public.payments (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id uuid NOT NULL,
  course_id uuid REFERENCES public.courses(id) ON DELETE SET NULL,
  amount integer NOT NULL DEFAULT 0,
  currency text NOT NULL DEFAULT 'NPR',
  status text NOT NULL DEFAULT 'pending',
  payment_method text,
  receipt_number text,
  notes text,
  paid_at timestamp with time zone,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage all payments" ON public.payments
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Students can view own payments" ON public.payments
  FOR SELECT USING (student_id = auth.uid());

CREATE POLICY "Trainers can view payments for their courses" ON public.payments
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.courses
      WHERE courses.id = payments.course_id AND courses.trainer_id = auth.uid()
    )
  );
