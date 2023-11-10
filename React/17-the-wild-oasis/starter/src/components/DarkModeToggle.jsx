import { useContextDarkMode } from "../context/DarkModeContext";
import ButtonIcon from "./ButtonIcon";
import { FiSun, FiMoon } from "react-icons/fi";
const DarkModeToggle = () => {
  const { isDarkMode, toggleDarkMode } = useContextDarkMode();

  return (
    <ButtonIcon onClick={toggleDarkMode}>
      {isDarkMode ? <FiSun /> : <FiMoon />}
    </ButtonIcon>
  );
};

export default DarkModeToggle;
