/* eslint-disable react/prop-types */
import styled from "styled-components";
import { useContext, createContext, useState } from "react";
import { HiEllipsisVertical } from "react-icons/hi2";
import { createPortal } from "react-dom";
import { useOutSideClick } from "../hooks";

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul`
  position: fixed;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  border: none;
  background: none;
  font-size: 1.4rem;
  padding: 1.2rem 2.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

const MenuContext = createContext();

const Menus = ({ children }) => {
  const [openId, setOpenId] = useState("");
  const [position, setPosition] = useState(null);

  const open = setOpenId;
  const close = () => setOpenId("");

  const value = { open, close, openId, position, setPosition };

  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
};

// Toggle List
function Toggle({ id }) {
  const { open, openId, close, setPosition } = useContext(MenuContext);

  function handlerClick(e) {
    // Get current position of button contain icon
    e.stopPropagation();
    const rect = e.target.closest("button").getBoundingClientRect();
    setPosition({
      x: window.innerWidth - rect.x - 2 * rect.width,
      y: rect.y + rect.height + 5,
    });
    return openId === "" || +openId !== +id ? open(id) : close();
  }

  return (
    <StyledToggle onClick={handlerClick}>
      <HiEllipsisVertical />
    </StyledToggle>
  );
}

function List({ id, children }) {
  const { close, openId, position } = useContext(MenuContext);
  const ref = useOutSideClick(close, false);

  if (+id !== +openId) return null;
  return createPortal(
    <StyledList position={position} ref={ref}>
      {children}
    </StyledList>,
    document.body
  );
}

function Button({ icon, children, onClick }) {
  const { close } = useContext(MenuContext);
  function handlerClick() {
    console.log("Clicking...");
    onClick?.();
    close();
  }
  return (
    <StyledButton onClick={handlerClick}>
      {icon} {children}
    </StyledButton>
  );
}

Menus.Menu = Menu;
Menus.List = List;
Menus.Toggle = Toggle;
Menus.Button = Button;
export default Menus;
