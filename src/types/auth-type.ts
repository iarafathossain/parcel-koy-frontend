import { UserStatusType } from "@/types/enum-type";
import { RoleType } from "./enum-type";

export interface ILoginResponse {
  sessionToken: string;
  accessToken: string;
  refreshToken: string;
  user: {
    needPasswordChange: boolean;
    email: string;
    name: string;
    role: RoleType;
    image: string;
    status: UserStatusType;
    isDeleted: boolean;
    emailVerified: boolean;
  };
}

export interface IJwtPayload {
  userId: string;
  email: string;
  role: RoleType;
  name: string;
  status: UserStatusType;
  isDeleted: boolean;
  emailVerified: boolean;
  iat?: number;
  exp?: number;
}
