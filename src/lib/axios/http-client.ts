import { env } from "@/env";
import { APIResponse } from "@/types/api-type";
import axios from "axios";
import { cookies } from "next/headers";

const axiosInstance = async () => {
  const cookieStore = await cookies();

  // Format all Next.js server cookies into a standard Cookie header string
  const cookieHeader = cookieStore
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join("; ");

  return axios.create({
    baseURL: env.NEXT_PUBLIC_API_BASE_URL,
    timeout: 30000,
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieHeader, // Automatically attaches to every request
    },
  });
};

export interface APIRequestOptions {
  params?: Record<string, unknown>;
  headers?: Record<string, string>;
}

const httpGet = async <TData>(
  endPoint: string,
  options?: APIRequestOptions,
): Promise<APIResponse<TData>> => {
  const instance = await axiosInstance();
  const response = await instance.get<APIResponse<TData>>(endPoint, {
    params: options?.params,
    headers: options?.headers,
  });
  return response.data;
};

const httpPost = async <TData>(
  endPoint: string,
  data: unknown,
  options?: APIRequestOptions,
): Promise<APIResponse<TData>> => {
  const instance = await axiosInstance();
  const response = await instance.post<APIResponse<TData>>(endPoint, data, {
    params: options?.params,
    headers: options?.headers,
  });
  return response.data;
};

const httpPut = async <TData>(
  endPoint: string,
  data: unknown,
  options?: APIRequestOptions,
): Promise<APIResponse<TData>> => {
  const instance = await axiosInstance();
  const response = await instance.put<APIResponse<TData>>(endPoint, data, {
    params: options?.params,
    headers: options?.headers,
  });
  return response.data;
};

const httpPatch = async <TData>(
  endPoint: string,
  data: unknown,
  options?: APIRequestOptions,
): Promise<APIResponse<TData>> => {
  const instance = await axiosInstance();
  const response = await instance.patch<APIResponse<TData>>(endPoint, data, {
    params: options?.params,
    headers: options?.headers,
  });
  return response.data;
};

const httpDelete = async <TData>(
  endPoint: string,
  options?: APIRequestOptions,
): Promise<APIResponse<TData>> => {
  const instance = await axiosInstance();
  const response = await instance.delete<APIResponse<TData>>(endPoint, {
    params: options?.params,
    headers: options?.headers,
  });
  return response.data;
};

export const httpClient = {
  get: httpGet,
  post: httpPost,
  put: httpPut,
  patch: httpPatch,
  delete: httpDelete,
};
