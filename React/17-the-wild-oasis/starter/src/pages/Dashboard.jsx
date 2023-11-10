import { Row, Heading } from "../components";
import { DashboardFilter, DashboardLayout } from "../features/dashboard";

function Dashboard() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Dashboard</Heading>
        <DashboardFilter />
      </Row>
      <Row>
        <DashboardLayout />
      </Row>
    </>
  );
}

export default Dashboard;
