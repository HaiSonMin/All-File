/* eslint-disable react/prop-types */
import styled from "styled-components";
import CreateCabinForm from "./CreateCabinForm";
import useCreateCabin from "./useCreateCabin";
import useDeleteCabin from "./useDeleteCabin";
// import { useState } from "react";
import { Button, ConfirmDelete, Modal, SpinnerMini } from "../../components";
import { formatCurrency } from "../../utils/helpers";
import { MdOutlineContentCopy } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBinLine } from "react-icons/ri";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2; // Tỉ lệ khung hình
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

const CabinRow = ({ cabin }) => {
  // const [showForm, setShowForm] = useState(false);
  const { isDeleting, deleteCabin } = useDeleteCabin();
  const { isCreating: isCoping, createCabin } = useCreateCabin();
  const { discount, image, maxCapacity, name, regularPrice } = cabin;
  const cabinImg = image ?? "cabin-001.jpg";

  function handlerDuplicateCabin() {
    const newCabin = {
      ...cabin,
      name: `Copy of ${name}`,
    };

    delete newCabin.id;

    createCabin(newCabin);
  }

  return (
    <>
      <TableRow>
        <Img src={cabinImg} alt="" />
        <Cabin>{name}</Cabin>
        <div>Fits up to {maxCapacity} peoples</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        {discount ? (
          <Discount>{formatCurrency(discount)}</Discount>
        ) : (
          <span>&mdash;</span>
        )}
        <div className="flex gap-1">
          {/* Copy */}
          <Button
            disabled={isCoping}
            size="small"
            variation="secondary"
            onClick={handlerDuplicateCabin}
          >
            {isCoping ? <SpinnerMini /> : <MdOutlineContentCopy />}
          </Button>
          {/* Edit  */}
          <Modal>
            <Modal.Open openWindowName={"editCabin"}>
              <Button size="small" variation="secondary">
                <CiEdit />
              </Button>
            </Modal.Open>
            <Modal.Window windowName={"editCabin"}>
              <CreateCabinForm cabinToEdit={cabin} />
            </Modal.Window>
            {/* Delete (When deleted, cabinRow has deleted => window deleted is mounted) */}
            <Modal.Open openWindowName={"deleteCabin"}>
              <Button size="small" variation="secondary">
                <RiDeleteBinLine />
              </Button>
            </Modal.Open>
            <Modal.Window windowName={"deleteCabin"}>
              <ConfirmDelete
                resourceName={cabin?.name}
                disabled={isDeleting}
                onConfirm={() => deleteCabin(cabin.id)}
              />
            </Modal.Window>
          </Modal>
        </div>
        {/* <div className="flex gap-1">
          <Button
            disabled={isCoping}
            size="small"
            variation="secondary"
            onClick={handlerDuplicateCabin}
          >
            {isCoping ? <SpinnerMini /> : <MdOutlineContentCopy />}
          </Button>
          <Button
            size="small"
            variation="secondary"
            onClick={() => setShowForm(!showForm)}
          >
            <CiEdit className={showForm && "text-red-900"} />
          </Button>
          <Button
            disabled={isDeleting}
            size="small"
            variation="secondary"
            onClick={() => deleteCabin(cabin.id)}
          >
            {isDeleting ? <SpinnerMini /> : <RiDeleteBinLine />}
          </Button>
        </div> */}
      </TableRow>
      {/* {showForm && (
        <CreateCabinForm cabinToEdit={cabin} onOpenEdit={setShowForm} />
      )} */}
    </>
  );
};

export default CabinRow;
