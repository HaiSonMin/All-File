import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBookingApi } from "../../services/apiBookings";

const useCheckin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { isLoading: isChecking, mutate: checkin } = useMutation({
    mutationFn: ({ bookingId, breakfast }) =>
      updateBookingApi(bookingId, {
        isPaid: true,
        status: "checked-in",
        ...breakfast,
      }),
    onSuccess: (data) => {
      console.log("data updated:::", data);
      toast.success("Check-in Successfully");
      queryClient.invalidateQueries({ active: true });
      navigate("/");
    },
    onError: () => toast.error("Some thing went wrong with check-in"),
  });

  return { isChecking, checkin };
};

export default useCheckin;
