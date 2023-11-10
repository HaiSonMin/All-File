import styled from "styled-components";
import { LoginForm } from "../features/authentication";
import { Logo, Heading } from "../components";

const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);
`;

function Login() {
  return (
    <LoginLayout>
      <Logo />
      <Heading as={"h3"} className="text-center">
        Login Form
      </Heading>
      <LoginForm />
    </LoginLayout>
  );
}

export default Login;
