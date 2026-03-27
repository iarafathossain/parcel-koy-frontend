"use server";

export async function loginAction(formData: FormData) {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");

  return {
    success: Boolean(email && password),
    message: "Login action placeholder",
  };
}
