import BookingRow from "./BookingRow";
import UseGetAllBookings from "./useGetAllBookings";
import { Spinner, Table, Menus, Pagination } from "../../components";

function BookingTable() {
  const { isGetting, bookings, count } = UseGetAllBookings();

  if (isGetting) return <Spinner />;

  return (
    <Menus>
      <Table columns="0.7fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={bookings}
          render={(booking) => (
            <BookingRow key={booking.id} booking={booking} />
          )}
        />
      </Table>
      <Table.Footer>
        <Pagination countItems={count} />
      </Table.Footer>
    </Menus>
  );
}

export default BookingTable;
