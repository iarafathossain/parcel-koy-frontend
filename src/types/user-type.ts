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
  riderProfile?: IRider;
  merchantProfile?: IMerchant;
  adminProfile?: IAdmin;
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

export interface IMerchant {
  id: string;
  userId: string;
  businessName: string;
  pickupAddress: string;
  originArea: {
    id: string;
    name: string;
  };
  averageRating: number;
  balance: string;
  creditLimit: string;
  createdAt: string;
  updatedAt: string;
  user: IUser;
}

export interface IRider {
  id: string;
  userId: string;
  presentAddress: string | null;
  permanentAddress: string | null;
  age: number;
  cashInHand: string;
  hubId: string | null;
  createdAt: string;
  updatedAt: string;
  user: IUser;
}
