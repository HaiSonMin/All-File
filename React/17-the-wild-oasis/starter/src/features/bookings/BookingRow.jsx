/* eslint-disable react/prop-types */
import styled from "styled-components";
import { format, isToday } from "date-fns";
import { Tag, Table, Menus, Modal, ConfirmDelete } from "../../components";
import { formatCurrency, formatDistanceFromNow } from "../../utils/helpers";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye } from "react-icons/ai";
import { TfiWrite } from "react-icons/tfi";
import { GrLogout } from "react-icons/gr";
import useCheckout from "../check-in-out/useCheckout";
import useDeleteBooking from "./useDeleteBooking";
import { RiDeleteBinLine } from "react-icons/ri";

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

function BookingRow({
  booking: {
    id: bookingId,
    // created_at,
    startDate,
    endDate,
    numberNights,
    // numberGuests,
    totalPrice,
    status,
    Guests: { fullName: guestName, email },
    Cabins: { name: cabinName },
  },
}) {
  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "red",
  };
  const navigate = useNavigate();
  const { checkout } = useCheckout();
  const { isDeleting, deleteBooking } = useDeleteBooking();

  return (
    <Table.Row>
      <Cabin>{cabinName}</Cabin>

      <Stacked>
        <span>{guestName}</span>
        <span>{email}</span>
      </Stacked>

      <Stacked>
        <span>
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}{" "}
          &rarr; {numberNights} night stay
        </span>
        <span>
          {format(new Date(startDate), "MMM dd yyyy")} &mdash;
          {format(new Date(endDate), "MMM dd yyyy")}
        </span>
      </Stacked>

      <Tag type={statusToTagName[status]}>{status?.replace("-", " ")}</Tag>

      <Amount>{formatCurrency(totalPrice)}</Amount>
      <Modal>
        <Menus>
          <Menus.Menu>
            <Menus.Toggle id={bookingId} />
            <Menus.List id={bookingId}>
              <Menus.Button
                icon={<AiOutlineEye />}
                onClick={() => navigate(`/bookings/${bookingId}`)}
              >
                See Detail
              </Menus.Button>
              {status === "unconfirmed" && (
                <Menus.Button
                  icon={<TfiWrite />}
                  onClick={() => navigate(`/checkin/${bookingId}`)}
                >
                  Check in
                </Menus.Button>
              )}
              {status === "checked-in" && (
                <Menus.Button
                  icon={<GrLogout />}
                  onClick={() => {
                    checkout(bookingId);
                    navigate(`/bookings`);
                  }}
                >
                  Check out
                </Menus.Button>
              )}
              <Modal.Open openWindowName={"deleteBooking"}>
                <Menus.Button icon={<RiDeleteBinLine />}>Delete</Menus.Button>
              </Modal.Open>
            </Menus.List>
            <Modal.Window windowName={"deleteBooking"}>
              <ConfirmDelete
                resourceName={bookingId}
                disabled={isDeleting}
                onConfirm={
                  () => deleteBooking(bookingId) // Execute every time deleteBooking done
                }
              />
            </Modal.Window>
          </Menus.Menu>
        </Menus>
      </Modal>
    </Table.Row>
  );
}

export default BookingRow;
