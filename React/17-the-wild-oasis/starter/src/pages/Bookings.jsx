import Heading from "../components/Heading";
import Row from "../components/Row";
import { BookingTable, BookingTableOperations } from "../features/bookings";

function Bookings() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All bookings</Heading>
        <BookingTableOperations/>
      </Row>
      <Row>
        <BookingTable />
      </Row>
    </>
  );
}

export default Bookings;
