import { Link } from "react-router-dom";
import { BiLogIn } from "react-icons/bi";

const Login = () => {
  return (
    <Link to="/login" className="flex items-center gap-2">
      <BiLogIn /> <span>Login</span>
    </Link>
  );
};

export default Login;
