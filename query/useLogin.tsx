"use client";

import { useMutation } from "@tanstack/react-query";

type loginPayload = { username: string; password: string };
type loginResponse = { access_token: string; token_type: string };

async function loginApi(payload: loginPayload): Promise<loginResponse> {
  const res = await fetch("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || "로그인에 실패했습니다.");
  }

  return res.json();
}

export default function useLogin() {
  const mutation = useMutation<loginResponse, Error, loginPayload>({
    mutationKey: ["login"],
    mutationFn: loginApi,
    retry: 0,
  });

  return {
    ...mutation,
    login: mutation.mutate,
    loginAsync: mutation.mutateAsync,
  };
}
