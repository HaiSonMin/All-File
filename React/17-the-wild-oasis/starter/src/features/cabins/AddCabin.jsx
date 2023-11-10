/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Modal } from "../../components";
import { Button } from "../../components";
import CreateCabinForm from "./CreateCabinForm";

// const AddCabin = () => {
//   const [showForm, setShowForm] = useState();
//   return (
//     <>
//       <Button onClick={() => setShowForm(!showForm)}>
//         Show From Create Cabin
//       </Button>
//       {/* {showFrom && <CreateCabinForm />} */}
//       {showForm && (
//         <Modal onClose={setShowForm}>
//           <CreateCabinForm  onCloseModal={setShowForm}/>
//         </Modal>
//       )}
//     </>
//   );
// };

const AddCabin = () => {
  return (
    <Modal>
      <Modal.Open openWindowName={"cabin-form"}>
        <Button>Add new cabin</Button>
      </Modal.Open>
      <Modal.Window windowName={"cabin-form"}>
        <CreateCabinForm />
      </Modal.Window>
    </Modal>
    // <Modal>
    //   <Modal.Open openWindowName={"cabin-form"}>
    //     <Button>Add new cabin</Button>
    //   </Modal.Open>
    //   <Modal.Window windowName={"cabin-form"}>
    //     <CabinTable />
    //   </Modal.Window>
    // </Modal>
  );
};

export default AddCabin;
