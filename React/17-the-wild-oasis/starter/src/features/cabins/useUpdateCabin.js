import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createCabinApi } from "../../services/apiCabins";

export default function useUpdateCabin() {
  const queryClient = useQueryClient();

  const { isLoading: isUpdating, mutate: updateCabin } = useMutation({
    mutationFn: ({ newCabin, id }) => createCabinApi(newCabin, id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      toast.success("Update cabin successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { isUpdating, updateCabin };
}
