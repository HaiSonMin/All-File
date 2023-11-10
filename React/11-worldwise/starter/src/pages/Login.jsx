import { useNavigate } from "react-router-dom";
import { PageNav } from "../components";
import Button from "../components/Button";
import styles from "./Login.module.css";
import { useEffect, useState } from "react";
import { useAuthContext } from "../contexts/AuthContext";

export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("qwerty");
  const { isAuthenticated, login } = useAuthContext();
  const navigate = useNavigate();

  function handlerLogin(e) {
    e.preventDefault();
    login(email, password);
  }

  useEffect(() => {
    // replace can be help me go back in browser
    if (isAuthenticated) navigate("/app", { replace: true });
  }, [isAuthenticated, navigate]);

  return (
    <main className={styles.login}>
      <PageNav />
      <form className={styles.form} onSubmit={handlerLogin}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button type={"primary"}>Login</Button>
          {/* <Link to={redirectLogin}>
            <Button type={"primary"}>Login</Button>
          </Link> */}
        </div>
      </form>
    </main>
  );
}
