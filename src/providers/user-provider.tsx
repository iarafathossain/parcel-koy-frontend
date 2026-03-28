// src/providers/UserProvider.tsx
"use client";

import { IUser } from "@/types/user-type";
import { createContext, ReactNode, useState } from "react";

interface userContextType {
  user: IUser | null;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
}

export const userContext = createContext<userContextType | undefined>(
  undefined,
);

export const UserProvider = ({
  children,
  initialUser,
}: {
  children: ReactNode;
  initialUser: IUser | null;
}) => {
  const [user, setUser] = useState<IUser | null>(initialUser);

  return (
    <userContext.Provider value={{ user, setUser }}>
      {children}
    </userContext.Provider>
  );
};
