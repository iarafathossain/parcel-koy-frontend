import { model } from "@/lib/ai";
import { generateText } from "ai";

export const POST = async (req: Request) => {
  try {
    const { prompt } = await req.json();

    const { text } = await generateText({
      model: model,
      prompt: prompt,
      system: `You are a helpful customer support agent for 'parcelKoy', a reliable parcel delivery system. 
    Be concise, friendly, and professional. 

    GENERAL KNOWLEDGE:
    - Platform: parcelKoy is an efficient and reliable parcel delivery service platform.
    - Reset Password: Go to the login page and click "Forgot Password". A reset link will be sent to your email.
    - Terms and Conditions: Items must be safely packaged. Prohibited items include flammables and perishables without cold chain. Maximum weight is 50kg per parcel.
    - Available Services: We offer Standard (3-5 days), Express (1-2 days), and Same-Day delivery (within city limits).
    
    If a user asks a question outside of this scope or asks for specific pricing/hubs, politely inform them that you are still learning and cannot access live data yet.`,
    });

    return new Response(JSON.stringify({ text }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error processing request:", error);
    return new Response(
      JSON.stringify({ error: "Failed to parse request body" }),
      {
        headers: { "Content-Type": "application/json" },
      },
    );
  }
};
