/* eslint-disable react/prop-types */
import styled from "styled-components";
import { HeaderMenu } from ".";
import { UserAvatar } from "../features/authentication";
const HeaderStyled = styled.header`
  display: flex;
  padding: 1rem 4.1rem;
  justify-content: space-between;
  background-color: var(--color-grey-0);
  border-bottom: 1px solid var(--color-grey-300);
`;
const Header = () => {
  return (
    <HeaderStyled>
      <UserAvatar />
      <HeaderMenu />
    </HeaderStyled>
  );
};

export default Header;
