import styled from "styled-components";

const Input = styled.input`
  font-size: 1.6rem;
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-sm);
  border: 1px solid var(--color-grey-800);
  padding: 0.8rem 1.2rem;
  box-shadow: var(--shadow-sm);

  &:focus {
    outline: none;
  }
`;

export default Input;
