// src/providers/user-provider.tsx
"use client";

import { IUser } from "@/types/user-type";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createContext, ReactNode } from "react";

// ❌ Make sure this line is COMPLETELY DELETED:
// import { userServices } from "@/services/user-service";

interface UserContextType {
  user: IUser | null;
  isLoading: boolean;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
}

export const userContext = createContext<UserContextType | undefined>(
  undefined,
);

const fetchUserClientSide = async (): Promise<IUser | null> => {
  try {
    const response = await fetch("/api/auth/me", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) return null;

    const data = await response.json();
    return data as IUser;
  } catch (error) {
    console.error("Client fetch error:", error);
    return null;
  }
};

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = useQueryClient();

  const { data: fetchedUser, isLoading } = useQuery({
    queryKey: ["user", "me"],
    queryFn: fetchUserClientSide, // Using the local function!
    staleTime: 5 * 60 * 1000,
    retry: false,
  });

  const user = fetchedUser ?? null;

  const setUser: React.Dispatch<React.SetStateAction<IUser | null>> = (
    updater,
  ) => {
    queryClient.setQueryData(["user", "me"], updater);
  };

  return (
    <userContext.Provider value={{ user, isLoading, setUser }}>
      {children}
    </userContext.Provider>
  );
};
