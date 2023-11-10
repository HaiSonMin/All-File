import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createCabinApi } from "../../services/apiCabins";

export default function useCreateCabin() {
  const queryClient = useQueryClient();

  const { isLoading: isCreating, mutate: createCabin } = useMutation({
    mutationFn: (newCabin) => createCabinApi(newCabin),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      toast.success("Create cabin successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { isCreating, createCabin };
}
