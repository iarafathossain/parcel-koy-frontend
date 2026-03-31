import { API } from "@/lib/api-endpoints";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token")?.value;
    const sessionToken = cookieStore.get("better-auth.session_token")?.value;

    if (!accessToken || !sessionToken) {
      return NextResponse.json(null, { status: 401 });
    }

    const response = await fetch(API.AUTH.ME, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: `access_token=${accessToken}; better-auth.session_token=${sessionToken}`,
      },
    });

    if (!response.ok) {
      return NextResponse.json(null, { status: 401 });
    }

    const { data } = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching user info:", error);
    return NextResponse.json(null, { status: 500 });
  }
}
