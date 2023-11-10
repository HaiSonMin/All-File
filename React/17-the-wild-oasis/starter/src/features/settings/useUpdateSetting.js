import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateSettingApi } from "../../services/apiSettings";

export default function useUpdateCabin() {
  const queryClient = useQueryClient();

  const { isLoading: isUpdating, mutate: updateSetting } = useMutation({
    mutationFn: updateSettingApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["settings"],
      });
      toast.success("Update setting successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { isUpdating, updateSetting };
}
