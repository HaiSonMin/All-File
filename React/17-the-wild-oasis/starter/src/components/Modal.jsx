/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import styled from "styled-components";
import {
  useRef,
  useState,
  useEffect,
  useContext,
  cloneElement,
  createContext,
} from "react";
import { IoClose } from "react-icons/io5";
import { createPortal } from "react-dom";
import { useOutSideClick } from "../hooks";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
  z-index: 100;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 10;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;

// Step 1:
const ModalContext = createContext();

// Step 2:
function Modal({ children }) {
  const [openName, setOpenName] = useState("");

  const open = setOpenName;
  const close = () => setOpenName("");

  const value = {
    open,
    close,
    openName,
  };

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
}

// Step 3:
function Open({ children, openWindowName }) {
  const { open } = useContext(ModalContext);

  return cloneElement(children, { onClick: () => open(openWindowName) });
}

// function Window({ children, windowName }) {
//   const { close, openName } = useContext(ModalContext);

//   if (openName !== windowName) return null; // When open close then openName="" => !== windowName
//   return createPortal(
//     <Overlay onClick={close}>
//       <StyledModal
//         onClick={(e) => {
//           e.stopPropagation(); // Cancel event click of parent component => stop event bubbling phase
//         }}
//       >
//         <Button onClick={close}>
//           <IoClose />
//         </Button>
//         {/* <CreateCabinForm  onCloseModal={close}/> */}
//         {cloneElement(children, { onOpenModal: close })}
//       </StyledModal>
//     </Overlay>,
//     document.body
//   );
// }
function Window({ children, windowName }) {
  const { close, openName } = useContext(ModalContext);

  const ref = useOutSideClick(close, true);

  if (openName !== windowName) return null; // When open close then openName="" => !== windowName
  return createPortal(
    <Overlay>
      <StyledModal ref={ref}>
        <Button onClick={close}>
          <IoClose />
        </Button>
        {/* <====> <CreateCabinForm  onCloseModal={close}/> */}
        {cloneElement(children, {
          onCloseModal: close,
        })}
      </StyledModal>
    </Overlay>,
    document.body
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;

// Make sure Modal always working good
// const Modal = ({ children, onClose }) => {
//   return createPortal(
//     <Overlay onClick={() => onClose(false)}>
//       <StyledModal
//         onClick={(e) => {
//           e.stopPropagation();
//         }}
//       >
//         <Button onClick={() => onClose(false)}>
//           <IoClose />
//         </Button>
//         {children}
//       </StyledModal>
//     </Overlay>,
//     document.body
//   );
// };

// export default Modal;
