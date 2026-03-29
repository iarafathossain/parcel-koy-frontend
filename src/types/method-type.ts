import { MethodTypeUnion } from "./enum-type";

export type IMethod = {
  id: string;
  name: string;
  slug: string;
  type: MethodTypeUnion;
  description: string;
  isActive: boolean;
  baseFee: string;
  createdAt: string;
  updatedAt: string;
};
