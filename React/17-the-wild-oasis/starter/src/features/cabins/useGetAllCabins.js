import { useQuery } from "@tanstack/react-query";
import { getCabinsApi } from "../../services/apiCabins";

export default function useGetCabins() {
  const { isLoading: isGetting, data: cabins } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabinsApi,
  });
  return { isGetting, cabins };
}
