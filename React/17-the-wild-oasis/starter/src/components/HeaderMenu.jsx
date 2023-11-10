import Logout from "./ButtonLogout";
import ButtonIcon from "./ButtonIcon";
import DarkModeToggle from "./DarkModeToggle";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import { HiOutlineUser } from "react-icons/hi2";

const StyledHeaderMenu = styled.ul`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

function HeaderMenu() {
  const navigate = useNavigate();

  return (
    <StyledHeaderMenu>
      <li>
        <ButtonIcon onClick={() => navigate("/account")}>
          <HiOutlineUser />
        </ButtonIcon>
      </li>
      <li>
        <DarkModeToggle />
      </li>
      <li>
        <Logout />
      </li>
    </StyledHeaderMenu>
  );
}

export default HeaderMenu;
