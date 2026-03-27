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
    status: string;
    isDeleted: boolean;
    emailVerified: boolean;
  };
}

export interface IUserInfo {
  id: string;
  name: string;
  email: string;
  role: RoleType;
}
