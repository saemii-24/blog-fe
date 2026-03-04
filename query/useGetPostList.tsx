import { useQuery } from "@tanstack/react-query";

type useGetPostListParams = {
  enabled?: boolean;
};

const function loginApi(payload: signUpPayload): Promise<signUpResponse> {

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
};

const useGetPostList = (params?: useGetPostListParams) => {
  const enabled = params?.enabled ?? true;

  const query = useQuery<any, Error>({
    queryKey: ["get-post-list"],
    queryFn: loginApi,
    enabled,
    retry: 0,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  return {
    ...query,
  };
};

export default useGetPostList;
