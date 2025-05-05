import { loginApi } from "@/lib/api/client";

export async function login(dto: { username: string; password: string }): Promise<{ token: string }> {
  return await loginApi.post(`${process.env.NEXT_PUBLIC_API_URL}auth/login`, dto);
}
