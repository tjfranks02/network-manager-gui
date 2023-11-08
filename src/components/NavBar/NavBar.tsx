import DogPhoto from "../../assets/dogWithSunnies.png";
import UserProfileCircle from "../UserProfileCircle";

import css from "./styles.module.css";
import { DEFAULT_NAVBAR_HEIGHT } from "../../constants/dashboardConstants";

const Header = ({ width, height }: { width: number, height: number }) => {
  return (
    <div 
      className={css.container}
      style={{
        width: `${width}px`,
        height: `${DEFAULT_NAVBAR_HEIGHT}px`,
      }}
    >
      <img
        className={css.logo}
        src={DogPhoto} 
      />
      <UserProfileCircle />
    </div>
  );
};

export default Header;