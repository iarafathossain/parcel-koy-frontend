import { env } from "@/env";
import { authServices } from "@/services/auth-service";
import { APIResponse } from "@/types/api-type";
import axios from "axios";
import { cookies, headers } from "next/headers";
import { isTokenExpiringSoon } from "../token-utils";

const tryRefreshToken = async (
  accessToken: string,
  refreshToken: string,
): Promise<void> => {
  if (!isTokenExpiringSoon(accessToken)) {
    return;
  }

  const requestHeaders = await headers();

  if (requestHeaders.get("x-token-refreshed") === "1") {
    return; // avoid multiple refresh attempts in the same request cycle
  }

  try {
    await authServices.isNewTokenWithRefreshTokenGenerated(refreshToken);
  } catch (error) {
    console.error("Error refreshing token:", error);
  }
};

const axiosInstance = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  const refreshToken = cookieStore.get("refresh_token")?.value;

  if (accessToken && refreshToken) {
    await tryRefreshToken(accessToken, refreshToken);
  }

  const cookieHeader = cookieStore
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join("; ");

  const instance = axios.create({
    baseURL: env.NEXT_PUBLIC_API_BASE_URL,
    timeout: 30000,
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieHeader,
    },
  });

  return instance;
};

export interface APIRequestOptions {
  params?: Record<string, unknown>;
  headers?: Record<string, string>;
}

const httpGet = async <TData>(
  endPoint: string,
  options?: APIRequestOptions,
): Promise<APIResponse<TData>> => {
  try {
    const instance = await axiosInstance();
    const response = await instance.get<APIResponse<TData>>(endPoint, {
      params: options?.params,
      headers: options?.headers,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

const httpPost = async <TData>(
  endPoint: string,
  data: unknown,
  options?: APIRequestOptions,
): Promise<APIResponse<TData>> => {
  try {
    const instance = await axiosInstance();
    const response = await instance.post<APIResponse<TData>>(endPoint, data, {
      params: options?.params,
      headers: options?.headers,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

const httpPut = async <TData>(
  endPoint: string,
  data: unknown,
  options?: APIRequestOptions,
): Promise<APIResponse<TData>> => {
  try {
    const instance = await axiosInstance();
    const response = await instance.put<APIResponse<TData>>(endPoint, data, {
      params: options?.params,
      headers: options?.headers,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

const httpPatch = async <TData>(
  endPoint: string,
  data: unknown,
  options?: APIRequestOptions,
): Promise<APIResponse<TData>> => {
  try {
    const instance = await axiosInstance();
    const response = await instance.patch<APIResponse<TData>>(endPoint, data, {
      params: options?.params,
      headers: options?.headers,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

const httpDelete = async <TData>(
  endPoint: string,
  options?: APIRequestOptions,
): Promise<APIResponse<TData>> => {
  try {
    const instance = await axiosInstance();
    const response = await instance.delete<APIResponse<TData>>(endPoint, {
      params: options?.params,
      headers: options?.headers,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const httpClient = {
  get: httpGet,
  post: httpPost,
  put: httpPut,
  patch: httpPatch,
  delete: httpDelete,
};
