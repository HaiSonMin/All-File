import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { updateCurrentUserApi } from "../../services/apiAuth";

const useUpdateUser = () => {
  const queryClient = useQueryClient();
  const { isLoading: isUpdating, mutate: updateUser } = useMutation({
    mutationFn: ({ fullName, avatar, password }) =>
      updateCurrentUserApi({ fullName, avatar, password }),
    onSuccess: (user) => {
      console.log("userUpdated:::", user);
      toast.success("Update user successfully");
      //   queryClient.setQueryData(["user"], user.user);
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error) => toast.error(error.message),
  });

  return { isUpdating, updateUser };
};

export default useUpdateUser;
