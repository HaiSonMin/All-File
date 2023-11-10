/* eslint-disable react/prop-types */
import styled from "styled-components";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { useSearchParams } from "react-router-dom";
import { SIZE_PAGE } from "../utils/constant";

const StyledPagination = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const P = styled.p`
  font-size: 1.4rem;
  margin-left: 0.8rem;

  & span {
    font-weight: 600;
  }
`;

const Buttons = styled.div`
  display: flex;
  gap: 0.6rem;
`;

const PaginationButton = styled.button`
  background-color: ${(props) =>
    props.active ? " var(--color-brand-600)" : "var(--color-grey-50)"};
  color: ${(props) => (props.active ? " var(--color-brand-50)" : "inherit")};
  border: none;
  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.6rem 1.2rem;
  transition: all 0.3s;

  &:has(span:last-child) {
    padding-left: 0.4rem;
  }

  &:has(span:first-child) {
    padding-right: 0.4rem;
  }

  & svg {
    height: 1.8rem;
    width: 1.8rem;
  }

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

const Pagination = ({ countItems }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = +searchParams.get("page") || 1;
  const numberPage = Math.ceil(countItems / SIZE_PAGE);

  function handlerNextPage() {
    const next = currentPage === numberPage ? currentPage : currentPage + 1;
    searchParams.set("page", next);
    setSearchParams(searchParams);
  }

  function handlerPreviousPage() {
    const prev = currentPage === 1 ? currentPage : currentPage - 1;
    searchParams.set("page", prev);
    setSearchParams(searchParams);
  }

  const pageForm = (currentPage - 1) * SIZE_PAGE + 1;
  const pageTo =
    currentPage === numberPage ? countItems : currentPage * SIZE_PAGE;

  if (numberPage === 1) return null;
  return (
    <StyledPagination>
      <P>
        Showing <span>{pageForm}</span> to <span>{pageTo}</span> of{" "}
        <span>{countItems}</span> results
      </P>
      <Buttons>
        <PaginationButton
          onClick={handlerPreviousPage}
          disabled={currentPage === 1}
        >
          <GrFormPrevious /> Previous
        </PaginationButton>
        <PaginationButton
          onClick={handlerNextPage}
          disabled={currentPage === numberPage}
        >
          <GrFormNext /> Next
        </PaginationButton>
      </Buttons>
    </StyledPagination>
  );
};

export default Pagination;
