import DogPhoto from "../../assets/dogWithSunnies.png";
import css from "./styles.module.css";
import { DEFAULT_NAVBAR_HEIGHT } from "../../constants/dashboardConstants";

const Header = ({ width, height }: { width: number, height: number }) => {
  return (
    <div 
      className={css.container}
      style={{
        backgroundColor: "green",
        width: `${width}px`,
        height: `73px`
      }}
    >
      <img
        className={css.logo}
        src={DogPhoto} 
      />
    </div>
  );
};

export default Header;