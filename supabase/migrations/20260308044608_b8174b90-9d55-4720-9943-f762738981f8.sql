
-- Add new columns to courses table for duration, time, location, abstract
ALTER TABLE public.courses ADD COLUMN IF NOT EXISTS duration text;
ALTER TABLE public.courses ADD COLUMN IF NOT EXISTS class_time text;
ALTER TABLE public.courses ADD COLUMN IF NOT EXISTS location text;
ALTER TABLE public.courses ADD COLUMN IF NOT EXISTS abstract text;

-- Create messages table for real-time messaging
CREATE TABLE public.messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id uuid NOT NULL,
  recipient_id uuid NOT NULL,
  subject text NOT NULL DEFAULT '',
  body text NOT NULL DEFAULT '',
  read boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- Users can view their own messages (sent or received)
CREATE POLICY "Users can view own messages" ON public.messages
  FOR SELECT TO authenticated
  USING (auth.uid() = sender_id OR auth.uid() = recipient_id);

-- Users can send messages
CREATE POLICY "Users can send messages" ON public.messages
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = sender_id);

-- Users can update received messages (mark as read)
CREATE POLICY "Users can update received messages" ON public.messages
  FOR UPDATE TO authenticated
  USING (auth.uid() = recipient_id);

-- Admins can manage all messages
CREATE POLICY "Admins can manage all messages" ON public.messages
  FOR ALL TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Enable realtime for messages
ALTER PUBLICATION supabase_realtime ADD TABLE public.messages;

-- Trainers should be able to view student profiles
CREATE POLICY "Trainers can view student profiles" ON public.profiles
  FOR SELECT TO authenticated
  USING (has_role(auth.uid(), 'trainer'::app_role));
