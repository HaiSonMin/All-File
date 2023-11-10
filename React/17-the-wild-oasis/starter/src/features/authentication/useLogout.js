import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logoutApi } from "../../services/apiAuth";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isLoading, mutate: logout } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      queryClient.removeQueries(); // Remove all state of user when logout
      toast.success("Logout Successfully");
      navigate("/login", { replace: true });
    },
    onError: () => {
      toast.error("Logout Error");
    },
  });
  return { isLoading, logout };
}
