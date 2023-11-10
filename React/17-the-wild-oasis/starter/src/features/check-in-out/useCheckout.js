import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBookingApi } from "../../services/apiBookings";

const useCheckout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { isLoading: isCheckout, mutate: checkout } = useMutation({
    mutationFn: (bookingId) =>
      updateBookingApi(bookingId, {
        status: "checked-out",
      }),
    onSuccess: (data) => {
      console.log("data updated:::", data);
      toast.success("Check-out Successfully");
      queryClient.invalidateQueries({ active: true });
      navigate("/");
    },
    onError: () => toast.error("Some thing went wrong with check-out"),
  });

  return { isCheckout, checkout };
};

export default useCheckout;
