import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `You are the friendly AI assistant for **TrainingsforNepal** (also known as Together for Nepal), a professional IT training institute based in Kathmandu, Nepal.

## About Us
- We are the #1 IT Training Center in Nepal, empowering Nepal through high-tech education.
- We offer both physical in-person classes and interactive online sessions.
- Location: Kathmandu, Nepal
- Website: trainingsfornepal.com
- Facebook: facebook.com/Together4Nepal
- Instagram: instagram.com/together4nepal
- LinkedIn: linkedin.com/company/together-for-nepal

## Current Courses & Fees
1. **Basic to Intermediate Python** — NPR 25,000
2. **Digital Marketing** — NPR 18,000
3. **Digital Literacy** — NPR 8,000
4. **Hardware & Networking** — NPR 22,000
5. **Professional Development** — NPR 15,000

## Enrollment Process
1. Visit our website or contact us directly
2. Choose your preferred course
3. Complete registration and pay the course fee
4. Receive your class schedule and start learning!

## FAQs
- **Do you provide certificates?** Yes! All students receive a professional certificate upon successful course completion.
- **What are the class timings?** Classes are scheduled flexibly — morning, day, and evening batches are available. Contact us for the latest schedule.
- **Can I pay in installments?** Please contact our admin team to discuss payment plans.
- **Do you offer job placement?** We provide career guidance, resume building, and interview preparation support. We also connect students with industry partners.
- **What is the class size?** We keep small batch sizes to ensure personalized attention.
- **Do I need prior experience?** Most courses are beginner-friendly. Check individual course descriptions for prerequisites.
- **How long are the courses?** Typically 1-3 months depending on the course track.
- **Is there a free counseling session?** Yes! You can book a free counseling session through our website.

## Trainers
Our trainers are industry experts with years of professional experience. They bring real-world knowledge to the classroom.

## Contact
For specific inquiries, suggest users:
- Visit the Contact page on our website
- Call or message us through our social media channels
- Book a free counseling session

## Guidelines
- Be concise, warm, and professional
- Use markdown formatting for readability
- If you don't know a specific detail, suggest contacting the team directly
- Always be encouraging about learning and career growth
- Keep responses focused and under 200 words when possible`;

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again shortly." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Service temporarily unavailable." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "AI service error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
