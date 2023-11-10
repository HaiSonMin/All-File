import styled from "styled-components";
import { BookingDataBox } from "../../features/bookings";
import {
  Row,
  Button,
  Heading,
  ButtonText,
  ButtonGroup,
  Spinner,
  CheckBox,
  SpinnerMini,
} from "../../components";

import { useMoveBack } from "../../hooks";
import useGetBooking from "../bookings/useGetBooking";
import { useState } from "react";
import { formatCurrency } from "../../utils/helpers";
import useCheckin from "./useCheckin";
import useGetSettings from "../settings/useGetSettings";
import { useNavigate } from "react-router-dom";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const moveBack = useMoveBack();
  const navigate = useNavigate();
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [confirmEatBreakfast, setConfirmEatBreakfast] = useState(false);

  const { isGettingBooking, booking = {} } = useGetBooking();
  const { isChecking, checkin } = useCheckin();
  const { isGettingSetting, settings } = useGetSettings();

  const {
    id: bookingId,
    Guests,
    totalPrice,
    numberGuests,
    hasBreakfast,
    numberNights,
  } = booking;

  const priceBreakfast = settings?.breakfastPrice * numberGuests * numberNights;
  const totalWithBreakfast = totalPrice + priceBreakfast;

  function handleCheckin() {
    if (!confirmPaid) return;
    if (confirmEatBreakfast)
      checkin({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: priceBreakfast,
          totalPrice: totalWithBreakfast,
        },
      });
    else checkin({ bookingId, breakfast: {} });
    navigate("/");
  }

  if (isGettingBooking && isGettingSetting) return <Spinner />;

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>
      {isGettingBooking ? <Spinner /> : <BookingDataBox booking={booking} />}
      {/* Breakfast */}
      {!hasBreakfast && (
        <Box>
          <CheckBox
            id={"breakfast"}
            checked={confirmEatBreakfast}
            onChange={() =>
              setConfirmEatBreakfast((addBreakfast) => !addBreakfast)
            }
          >
            Do you want to add breakfast for{" "}
            <span className="text-green-500">
              {formatCurrency(priceBreakfast)}
            </span>
          </CheckBox>
        </Box>
      )}
      {/* Has Paid */}
      <Box>
        <CheckBox
          id={booking.id}
          checked={confirmPaid}
          onChange={() => setConfirmPaid(!confirmPaid)}
          disabled={confirmPaid || isChecking}
        >
          <p>
            I confirm that <span>{Guests?.fullName}</span> has paid the total
            amount:{" "}
            {!confirmEatBreakfast || hasBreakfast ? (
              <span className="text-green-500">
                {formatCurrency(totalPrice)}
              </span>
            ) : (
              <>
                <span className="text-green-500">
                  {formatCurrency(totalWithBreakfast)}
                </span>{" "}
                (
                <span className="text-green-500">
                  {formatCurrency(totalPrice)}
                </span>
                +
                <span className="text-green-500">
                  {formatCurrency(priceBreakfast)}
                </span>
                )
              </>
            )}
          </p>
        </CheckBox>
      </Box>
      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmPaid || isChecking}>
          {isChecking ? <SpinnerMini /> : `Check in booking #${bookingId}`}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
