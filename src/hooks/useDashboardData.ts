import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Course {
  id: string;
  title: string;
  description: string | null;
  icon: string | null;
  fee: string | null;
  trainer_id: string | null;
  trainer_name: string | null;
  status: string | null;
  total_lessons: number | null;
  rating: number | null;
  created_at: string;
  duration: string | null;
  class_time: string | null;
  location: string | null;
  abstract: string | null;
}

export interface Enrollment {
  id: string;
  student_id: string;
  course_id: string;
  progress: number | null;
  completed_lessons: number | null;
  status: string | null;
  enrolled_at: string;
  course?: Course;
}

export interface Assignment {
  id: string;
  course_id: string;
  title: string;
  description: string | null;
  due_date: string | null;
  created_at: string;
  course?: Course;
}

export interface AssignmentSubmission {
  id: string;
  assignment_id: string;
  student_id: string;
  status: string | null;
  grade: string | null;
  feedback: string | null;
  submitted_at: string;
  assignment?: Assignment;
}

export interface Certificate {
  id: string;
  student_id: string;
  course_id: string | null;
  title: string;
  certificate_code: string | null;
  issued_at: string;
}

export interface Profile {
  id: string;
  user_id: string;
  full_name: string | null;
  role: string;
  created_at: string;
}

export interface Message {
  id: string;
  sender_id: string;
  recipient_id: string;
  subject: string;
  body: string;
  read: boolean;
  created_at: string;
  sender_profile?: Profile;
  recipient_profile?: Profile;
}

export function useCourses() {
  return useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("courses")
        .select("*")
        .order("title");
      if (error) throw error;
      return data as Course[];
    },
  });
}

export function useEnrollments(studentId?: string) {
  return useQuery({
    queryKey: ["enrollments", studentId],
    enabled: !!studentId,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("enrollments")
        .select("*, course:courses(*)")
        .eq("student_id", studentId!);
      if (error) throw error;
      return data as (Enrollment & { course: Course })[];
    },
  });
}

export function useAssignments(studentId?: string) {
  return useQuery({
    queryKey: ["assignments", studentId],
    enabled: !!studentId,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("assignments")
        .select("*, course:courses(title, icon)")
        .order("due_date", { ascending: true });
      if (error) throw error;
      return data;
    },
  });
}

export function useSubmissions(studentId?: string) {
  return useQuery({
    queryKey: ["submissions", studentId],
    enabled: !!studentId,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("assignment_submissions")
        .select("*, assignment:assignments(title, course_id, due_date, course:courses(title))")
        .eq("student_id", studentId!);
      if (error) throw error;
      return data;
    },
  });
}

export function useCertificates(studentId?: string) {
  return useQuery({
    queryKey: ["certificates", studentId],
    enabled: !!studentId,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("certificates")
        .select("*")
        .eq("student_id", studentId!);
      if (error) throw error;
      return data as Certificate[];
    },
  });
}

export function useAllProfiles() {
  return useQuery({
    queryKey: ["all-profiles"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as Profile[];
    },
  });
}

export function useEnrollmentCount(courseId?: string) {
  return useQuery({
    queryKey: ["enrollment-count", courseId],
    enabled: !!courseId,
    queryFn: async () => {
      const { count, error } = await supabase
        .from("enrollments")
        .select("*", { count: "exact", head: true })
        .eq("course_id", courseId!);
      if (error) throw error;
      return count ?? 0;
    },
  });
}

export function useAllEnrollments() {
  return useQuery({
    queryKey: ["all-enrollments"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("enrollments")
        .select("*, course:courses(title, icon, fee)")
        .order("enrolled_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });
}

export function useMessages(userId?: string) {
  return useQuery({
    queryKey: ["messages", userId],
    enabled: !!userId,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .or(`sender_id.eq.${userId},recipient_id.eq.${userId}`)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as Message[];
    },
  });
}

export function useSessions(courseId?: string) {
  return useQuery({
    queryKey: ["sessions", courseId],
    queryFn: async () => {
      let query = supabase.from("sessions").select("*, course:courses(title, icon)").order("session_date", { ascending: true });
      if (courseId) query = query.eq("course_id", courseId);
      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });
}

export interface Payment {
  id: string;
  student_id: string;
  course_id: string | null;
  amount: number;
  currency: string;
  status: string;
  payment_method: string | null;
  receipt_number: string | null;
  notes: string | null;
  paid_at: string | null;
  created_at: string;
  course?: { title: string; icon: string | null };
  student_profile?: Profile;
}

export function usePayments() {
  return useQuery({
    queryKey: ["payments"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("payments")
        .select("*, course:courses(title, icon)")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as Payment[];
    },
  });
}

export function useStudentPayments(studentId?: string) {
  return useQuery({
    queryKey: ["student-payments", studentId],
    enabled: !!studentId,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("payments")
        .select("*, course:courses(title, icon)")
        .eq("student_id", studentId!)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as Payment[];
    },
  });
}
