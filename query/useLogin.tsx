import { useQuery } from "@tanstack/react-query";

type UseLoginParams = {
  enabled?: boolean;
};

const fetchList = async (): Promise<ListItem[]> => {
  const response = await fetch("/api/login");

  if (!response.ok) {
    throw new Error("데이터를 불러올 수 없습니다.");
  }
  return response.json();
};

const useLogin = (params?: UseLoginParams) => {
  const enabled = params?.enabled ?? true;

  const query = useQuery<ListItem[], Error>({
    queryKey: ["login"],
    queryFn: fetchList,
    enabled,
    retry: 0,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  return {
    ...query,
  };
};

export default useLogin;
