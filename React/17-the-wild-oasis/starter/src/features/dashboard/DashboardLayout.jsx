import styled from "styled-components";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: ${(props) => props.columns};
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;
const DashboardLayout = () => {
  return (
    <StyledDashboardLayout columns="1fr 1fr 1fr 1fr">
      <div>Statistics</div>
      <div>Today activity</div>
      <div>Char Stay duration</div>
      <div>Char sale</div>
    </StyledDashboardLayout>
  );
};

export default DashboardLayout;
