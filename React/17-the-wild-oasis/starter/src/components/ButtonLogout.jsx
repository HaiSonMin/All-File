import { BiLogOut } from "react-icons/bi";
import useLogout from "../features/authentication/useLogout";

const Logout = () => {
  const { isLoading, logout } = useLogout();
  return (
    <button
      className="flex items-center gap-2"
      onClick={logout}
      disabled={isLoading}
    >
      <BiLogOut /> <span>Logout</span>
    </button>
  );
};

export default Logout;
