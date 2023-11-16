import Logo from "../../assets/logo.png";
import UserProfileCircle from "../UserProfileCircle";

import css from "./styles.module.css";
import { DEFAULT_NAVBAR_HEIGHT } from "../../constants/dashboardConstants";

const Header = ({ width }: { width: number, height: number }) => {
  return (
    <div 
      className={css.container}
      style={{
        width: `${width}px`,
        height: `${DEFAULT_NAVBAR_HEIGHT}px`,
        boxShadow: "rgba(100, 100, 111, 0.2) 0px 0px 5px 0px",
        position: "relative",
        zIndex: 1
      }}
    >
      <img
        className={css.logo}
        src={Logo} 
      />
      <UserProfileCircle />
    </div>
  );
};

export default Header;