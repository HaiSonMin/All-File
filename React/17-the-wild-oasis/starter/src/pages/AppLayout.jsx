import { Outlet } from "react-router-dom";
import { Header, SideBar } from "../components";
import styled from "styled-components";

const AppLayoutStyled = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;
`;

const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 2.2rem 4.1rem;
`;

const Container = styled.div`
  margin: 0 auto;
  max-width: 120rem;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;
function AppLayout() {
  return (
    <AppLayoutStyled>
      <Header />
      <SideBar />
      <Main>
        <Container>
          <Outlet />
        </Container>
      </Main>
    </AppLayoutStyled>
  );
}

export default AppLayout;
