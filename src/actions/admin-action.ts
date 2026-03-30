"use server";

import { catchError } from "@/helpers/catch-error";
import { adminServices } from "@/services/admin-service";
import {
  IActivateUserPayload,
  IBlockUserPayload,
} from "@/validators/auth-validators";

export const getAllAdminsAction = async (queryString: string) => {
  try {
    return await adminServices.getAllAdmins(queryString);
  } catch (error) {
    throw new Error(catchError(error));
  }
};

export const softDeleteAdminAction = async (adminId: string) => {
  try {
    return await adminServices.softDeleteAdmin(adminId);
  } catch (error) {
    throw new Error(catchError(error));
  }
};

export const permanentDeleteAdminAction = async (adminId: string) => {
  try {
    return await adminServices.permanentDeleteAdmin(adminId);
  } catch (error) {
    throw new Error(catchError(error));
  }
};

export const activateUserAction = async (payload: IActivateUserPayload) => {
  try {
    return await adminServices.activateUser(payload);
  } catch (error) {
    throw new Error(catchError(error));
  }
};

export const blockUserAction = async (payload: IBlockUserPayload) => {
  try {
    return await adminServices.blockUser(payload);
  } catch (error) {
    throw new Error(catchError(error));
  }
};
