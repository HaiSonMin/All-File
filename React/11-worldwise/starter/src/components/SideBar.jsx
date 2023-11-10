import Logo from "./Logo";
import styles from "./SideBar.module.css";
import { AppNav } from "../components";
import { Outlet } from "react-router-dom";
export default function SideBar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />
      <Outlet />
      <footer className={styles.footer}>
        <p className={styles.copyright}>
          Copy right {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
}
