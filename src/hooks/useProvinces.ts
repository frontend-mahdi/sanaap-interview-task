import { useQuery } from "@tanstack/react-query";
import { getProvinces } from "../services/locationService";

export function useProvinces() {
  return useQuery({
    queryKey: ["provinces"],
    queryFn: getProvinces,
    staleTime: Infinity,
  });
}