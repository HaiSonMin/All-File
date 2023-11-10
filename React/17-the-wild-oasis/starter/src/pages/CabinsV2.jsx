import { Row, Heading } from "../components";
import {
  AddCabin,
  CabinTableOperation,
  CabinTableV2,
} from "../features/cabins";

function Cabins() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <CabinTableOperation />
      </Row>
      <Row>
        <CabinTableV2 />
        <AddCabin />
      </Row>
    </>
  );
}

export default Cabins;
