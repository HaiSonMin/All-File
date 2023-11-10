import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { signUpApi } from "../../services/apiAuth";

export default function useSignUp() {
  const { isLoading, mutate: signUp } = useMutation({
    mutationFn: ({ fullName, email, password }) =>
      signUpApi({ fullName, email, password }),
    onSuccess: (user) => {
      toast.success(`Register ${user.fullName} successfully`);
    },
    onError: (error) => toast.error(error.message),
  });
  return { isLoading, signUp };
}
