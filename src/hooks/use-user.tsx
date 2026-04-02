"use client";

import { userContext } from "@/providers/user-provider";
import { useContext } from "react";

export const useUser = () => {
  const context = useContext(userContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
