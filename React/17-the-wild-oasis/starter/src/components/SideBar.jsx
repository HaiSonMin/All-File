import Logo from "./Logo";
import styled from "styled-components";
import MainNav from "./MainNav";
// import Uploader from "../data/Uploader";

const SidebarStyled = styled.div`
  background-color: var(--color-grey-0);
  border-right: 1px solid var(--color-grey-300);
  padding: 3.2rem 2.4rem;
  grid-row: 1/-1;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
`;

const SideBar = () => {
  return (
    <SidebarStyled>
      <Logo />
      <MainNav />
      {/* <Uploader /> */}
    </SidebarStyled>
  );
};

export default SideBar;
