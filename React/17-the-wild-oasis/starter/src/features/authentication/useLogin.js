import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginApi } from "../../services/apiAuth";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isLoading, mutate: login } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (user) => {
      // Set data query cache for user
      // Not fetching user(ProtectedRoute) when login success
      queryClient.setQueryData(["user"], user.user);
      toast.success("Login Successfully");
      navigate("/dashboard", { replace: true });
    },
    onError: () => {
      toast.error("Login Error");
    },
  });
  return { isLoading, login };
}
