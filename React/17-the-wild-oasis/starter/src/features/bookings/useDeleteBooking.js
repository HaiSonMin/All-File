import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBookingApi } from "../../services/apiBookings";
import { toast } from "react-hot-toast";

const useDeleteBooking = () => {
  const queryClient = useQueryClient();
  const { isLoading: isDeleting, mutate: deleteBooking } = useMutation({
    mutationFn: (bookingId) => deleteBookingApi(bookingId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      toast.success(`Delete booking successfully`);
    },
    onError: (error) => toast.error(error.message),
  });
  return { isDeleting, deleteBooking };
};

export default useDeleteBooking;
