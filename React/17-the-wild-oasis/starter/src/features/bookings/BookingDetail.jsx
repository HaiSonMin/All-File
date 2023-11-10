import styled from "styled-components";
import BookingDataBox from "./BookingDataBox";
import {
  Row,
  Tag,
  Button,
  Heading,
  ButtonText,
  ButtonGroup,
  Spinner,
  SpinnerMini,
  Modal,
  ConfirmDelete,
} from "../../components";

import useGetBooking from "./useGetBooking";
import { useMoveBack } from "../../hooks";
import { useNavigate } from "react-router-dom";
import useCheckout from "../check-in-out/useCheckout";
import useDeleteBooking from "./useDeleteBooking";
const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const navigate = useNavigate();
  const { isGettingBooking, booking = {} } = useGetBooking();
  const { status, id: bookingId } = booking;
  const { isCheckout, checkout } = useCheckout();
  const { isDeleting, deleteBooking } = useDeleteBooking();
  const moveBack = useMoveBack();

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "red",
  };

  function handlerCheckout() {
    checkout(bookingId);
  }

  if (isGettingBooking) return <Spinner />;

  if (booking.status === "checked-out") navigate(`/bookings`);

  return (
    <Modal>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status?.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        {status === "unconfirmed" && (
          <Button
            variation="primary"
            onClick={() => navigate(`/checkin/${bookingId}`)}
          >
            Checkin
          </Button>
        )}
        {status === "checked-in" && (
          <Button onClick={handlerCheckout}>
            {isCheckout ? <SpinnerMini /> : "Check out"}
          </Button>
        )}
        <Modal.Open openWindowName={"deleteBooking"}>
          <Button variation="danger">
            {isCheckout ? <SpinnerMini /> : "Delete"}
          </Button>
        </Modal.Open>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
        <Modal.Window windowName={"deleteBooking"}>
          <ConfirmDelete
            disabled={isDeleting}
            resourceName={booking?.id}
            onConfirm={() =>
              deleteBooking(bookingId, { onSettled: () => navigate(-1) })
            }
          />
        </Modal.Window>
      </ButtonGroup>
    </Modal>
  );
}

export default BookingDetail;
