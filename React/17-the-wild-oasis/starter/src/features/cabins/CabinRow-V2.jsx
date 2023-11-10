/* eslint-disable react/prop-types */
import styled from "styled-components";
import CreateCabinForm from "./CreateCabinForm";
import useCreateCabin from "./useCreateCabin";
import useDeleteCabin from "./useDeleteCabin";
import { ConfirmDelete, Modal, Table } from "../../components";
import { formatCurrency } from "../../utils/helpers";
import { MdOutlineContentCopy } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBinLine } from "react-icons/ri";
import { Menus } from "../../components";

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2; // Tỉ lệ khung hình
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-4px);
  border-radius: 4px;
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
  const { createCabin } = useCreateCabin();
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
    <Table.Row>
      <Img src={cabinImg} alt="" />
      <Cabin>{name}</Cabin>
      <div>Fits up to {maxCapacity} peoples</div>
      <Price>{formatCurrency(regularPrice)}</Price>
      {discount ? (
        <Discount>{formatCurrency(discount)}</Discount>
      ) : (
        <span>&mdash;</span>
      )}
      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={cabin.id} />

          <Menus.List id={cabin.id}>
            <Menus.Button
              icon={<MdOutlineContentCopy />}
              onClick={handlerDuplicateCabin}
            >
              Duplicate
            </Menus.Button>

            <Modal.Open openWindowName={"editCabin"}>
              <Menus.Button icon={<CiEdit />}>Edit</Menus.Button>
            </Modal.Open>

            <Modal.Open openWindowName={"deleteCabin"}>
              <Menus.Button icon={<RiDeleteBinLine />}>Delete</Menus.Button>
            </Modal.Open>
          </Menus.List>

          <Modal.Window windowName={"editCabin"}>
            <CreateCabinForm cabinToEdit={cabin} />
          </Modal.Window>

          <Modal.Window windowName={"deleteCabin"}>
            <ConfirmDelete
              disabled={isDeleting}
              resourceName={cabin?.name}
              onConfirm={() => deleteCabin(cabin.id)}
            />
          </Modal.Window>
        </Menus.Menu>
      </Modal>
    </Table.Row>
  );
};

export default CabinRow;
