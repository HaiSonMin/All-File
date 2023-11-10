import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getBookingApi } from "../../services/apiBookings";

export default function useGetBooking() {
  const { bookingId } = useParams();

  console.log("bookingId:::", bookingId);

  const {
    isLoading: isGettingBooking,
    data: booking,
    error,
  } = useQuery({
    queryKey: ["booking", bookingId],
    queryFn: () => getBookingApi(bookingId),
  });

  return { isGettingBooking, booking, error };
}
