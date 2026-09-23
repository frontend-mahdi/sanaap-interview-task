import { useQuery } from "@tanstack/react-query";
import { checkAgencyCode } from "../services/agencyCodeService";

export function useCheckAgencyCode(agentCode: string) {
  return useQuery({
    queryKey: ["agency-code", agentCode],
    queryFn: () => checkAgencyCode(agentCode),
    enabled: !!agentCode.trim(),
    retry: false,
    refetchOnWindowFocus: false,
  });
}