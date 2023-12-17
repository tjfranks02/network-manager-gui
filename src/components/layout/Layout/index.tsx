import { Outlet } from "react-router-dom";

import Navbar from "../NavBar";
import { DEFAULT_NAVBAR_HEIGHT } from "../../../constants/dashboardConstants";

import css from "./styles.module.css";

const Layout = () => {
  return (
    <div className={css.container}>
      <Navbar width={window.innerWidth} height={DEFAULT_NAVBAR_HEIGHT} />
      <div className={css.outletContent}>
        <Outlet />
      </div>
    </div>
  )
};

export default Layout;