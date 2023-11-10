import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllBookingsApi } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { SIZE_PAGE } from "../../utils/constant";

export default function useGetAllBookings() {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

  // 1.Filter
  const filterValue = searchParams.get("status");

  const filter =
    !filterValue || filterValue === "all"
      ? null
      : {
          field: "status",
          value: filterValue,
        };

  // 2.Sort
  const sortValue = searchParams.get("sortBy") || "created_at-asc";

  const [field, direction] = sortValue.split("-");

  const sortBy = { field, direction };

  // 3. Page
  const page = !searchParams.get("page") ? 1 : +searchParams.get("page");

  const { isLoading: isGetting, data: { bookings, count } = {} } = useQuery({
    queryKey: ["bookings", filter, sortValue, page], // Same with array dependency
    queryFn: () => getAllBookingsApi({ filter, sortBy, page }),
  });

  const numberPage = Math.ceil(count / SIZE_PAGE);
  if (page < numberPage)
    // Fetch data 1 page before
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortValue, page + 1], // Same with array dependency
      queryFn: () => getAllBookingsApi({ filter, sortBy, page: page + 1 }),
    });
  if (page > 1)
    // Fetch data 1 page after
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortValue, page - 1], // Same with array dependency
      queryFn: () => getAllBookingsApi({ filter, sortBy, page: page - 1 }),
    });

  return { isGetting, bookings, count };
}
