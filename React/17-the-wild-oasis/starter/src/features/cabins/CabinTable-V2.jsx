/* eslint-disable react/prop-types */
import CabinRowV2 from "./CabinRow-V2";
import useGetCabins from "./useGetAllCabins";
import { Spinner, Table, Menus, Pagination } from "../../components";
import { useSearchParams } from "react-router-dom";
import { sortObject } from "../../utils/helpers";
const CabinTable = () => {
  const { isGetting, cabins } = useGetCabins();
  const [searchParams] = useSearchParams(); // Path change then CabinTable re-render

  // console.log(cabins);

  // 1.Filter
  const filterValue = searchParams.get("discount") || "all";
  let filteredCabins;
  if (filterValue === "all") filteredCabins = cabins;
  if (filterValue === "no-discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
  if (filterValue === "with-discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount > 0);

  // 2.Sort
  const sortByValue = searchParams.get("sortBy") || "created_at-asc";

  const sortedCabins = sortObject({
    data: filteredCabins,
    sortValue: sortByValue,
  });

  // const [field, direction] = sortByValue.split("-");
  // const modifier = direction === "asc" ? 1 : -1;
  // const sortedCabins = filteredCabins?.toSorted((a, b) => {
  //   if (typeof a[field] === "number" && typeof b[field] === "number")
  //     return (a[field] - b[field]) * modifier;
  //   if (typeof a[field] === "string" && typeof b[field] === "string")
  //     return a[field].localeCompare(b[field]) * modifier;
  // });

  console.log(sortedCabins);

  if (isGetting) return <Spinner />;

  return (
    <Menus>
      <Table role="table" columns={"0.6fr 1.2fr 2fr 1fr 1fr 0.8fr"}>
        <Table.Header>
          <div></div>
          <div>Cabins</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={sortedCabins}
          render={(cabin) => <CabinRowV2 cabin={cabin} key={cabin.id} />}
        />
        <Table.Footer>
          <Pagination countItems={cabins.length} />
        </Table.Footer>
      </Table>
    </Menus>
  );
};

export default CabinTable;
