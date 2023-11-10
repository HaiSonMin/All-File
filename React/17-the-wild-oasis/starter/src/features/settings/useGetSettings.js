import { useQuery } from "@tanstack/react-query";
import { getSettingsApi } from "../../services/apiSettings";

export default function useGetSettings() {
  const { isLoading: isGettingSetting, data: settings } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettingsApi,
  });
  return { isGettingSetting, settings };
}
