"use client";

import { useMutation } from "@tanstack/react-query";

type signUpPayload = { username: string; password: string };
type signUpResponse = { access_token: string; token_type: string };
async function signUpApi(payload: signUpPayload): Promise<signUpResponse> {
  const res = await fetch("/api/signUp", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || "회원가입 실패");
  }

  return res.json();
}

export default function useSignUp() {
  const mutation = useMutation<signUpResponse, Error, signUpPayload>({
    mutationKey: ["signUp"],
    mutationFn: signUpApi,
    retry: 0,
  });

  return {
    ...mutation,
    signUp: mutation.mutate,
    signUpAsync: mutation.mutateAsync,
  };
}
