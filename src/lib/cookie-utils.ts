import { cookies } from "next/headers";

export const setCookie = async (
  name: string,
  value: string,
  maxAgeInSecond?: number,
) => {
  const cookieStore = await cookies();

  cookieStore.set(name, value, {
    secure: true,
    httpOnly: true,
    sameSite: "none",
    maxAge: maxAgeInSecond,
    path: "/",
  });
};

export const getCookie = async (name: string) => {
  const cookieStore = await cookies();

  return cookieStore.get(name)?.value;
};

export const deleteCookie = async (name: string) => {
  const cookieStore = await cookies();
  cookieStore.delete(name);
};
