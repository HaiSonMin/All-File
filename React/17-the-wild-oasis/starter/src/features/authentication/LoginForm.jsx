import useLogin from "./useLogin";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Form, Input, Button, FormRowVertical } from "../../components";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

function LoginForm() {
  const [email, setEmail] = useState("hson22102000@gmail.com");
  const [password, setPassword] = useState("bokute22102000");
  const queryClient = useQueryClient();
  const { isLoading, login } = useLogin();
  const navigate = useNavigate();

  useEffect(() => {
    const user = queryClient.getQueriesData({ queryKey: ["user"] });
    if (user?.[0]?.[1]?.role) navigate("/dashboard");
  }, [navigate, queryClient]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!email && !password)
      return toast.error("Please enter email of password");
    login({ email, password });
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRowVertical label="Email address">
        <Input
          type="email"
          id="email"
          // This makes this form better for password managers
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
        />
      </FormRowVertical>
      <FormRowVertical label="Password">
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
        />
      </FormRowVertical>
      <FormRowVertical>
        <Button size="large" disabled={isLoading}>
          Login
        </Button>
      </FormRowVertical>
    </Form>
  );
}

export default LoginForm;
