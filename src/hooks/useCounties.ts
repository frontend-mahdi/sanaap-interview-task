import { useQuery } from "@tanstack/react-query";
import { getCounties } from "../services/locationService";

export function useCounties(provinceId: string) {
  return useQuery({
    queryKey: ["counties", provinceId],
    queryFn: () => getCounties(provinceId),
    enabled: !!provinceId,
    staleTime: Infinity,
  });
}