import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useUser from "../features/authentication/useUser";
import Spinner from "./Spinner";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  justify-content: center;
  align-items: center;
`;

/* eslint-disable react/prop-types */
const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  // 1. Load the authenticated user
  const { isLoading, isAuthenticated } = useUser();

  // 2. If there is no AUTHENTICATE, redirect
  useEffect(() => {
    if (!isLoading && !isAuthenticated) navigate("/login");
  }, [isLoading, isAuthenticated, navigate]);

  // 3. Show spinner when is loading
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  // 4. If there is a User, re-render app

  return <>{children}</>;
};

export default ProtectedRoute;
