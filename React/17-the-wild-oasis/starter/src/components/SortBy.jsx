/* eslint-disable react/prop-types */

import { useSearchParams } from "react-router-dom";
import Select from "./Select";

const SortBy = ({ options }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentSortBy = searchParams.get("sortBy") || ""; // Helps select to stay the same when re-rendering
  function handlerChange(e) {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  }
  return (
    <Select
      options={options}
      value={currentSortBy}
      type={"white"}
      onChange={handlerChange}
    />
  );
};

export default SortBy;
