import { GenderType, RoleType, UserStatusType } from "./enum-type";
import { IHub } from "./hub-type";

export interface IUser {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string | null;
  contactNumber: string;
  gender: GenderType;
  role: RoleType;
  status: UserStatusType;
  needPasswordChange: boolean;
  isDeleted: boolean;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface IAdmin {
  id: string;
  userId: string;
  presentAddress: string | null;
  permanentAddress: string | null;
  createdAt: string;
  updatedAt: string;
  user: IUser;
  managedHubs: IHub[];
}
