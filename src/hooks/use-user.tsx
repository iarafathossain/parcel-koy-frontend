// src/hooks/use-user.tsx
"use client";

import { userContext } from "@/providers/user-provider";
import { useContext } from "react";

// ❌ Make sure there are NO imports from "@/services/..." or "@/lib/axios/..." here

export const useUser = () => {
  const context = useContext(userContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
