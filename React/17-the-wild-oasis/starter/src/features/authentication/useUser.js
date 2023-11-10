import { useQuery } from "@tanstack/react-query";
import { getCurrentUserApi } from "../../services/apiAuth";

const useUser = () => {
  const { isLoading, data: user } = useQuery({
    queryKey: ["user"], // If user have in the buffet memory => not fetch api
    queryFn: () => getCurrentUserApi(),
  });
  return { isLoading, user, isAuthenticated: user?.role === "authenticated" };
};

export default useUser;
