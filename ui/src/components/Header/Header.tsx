import DogPhoto from "../../assets/dogWithSunnies.png";
import css from "./styles.module.css";
import { DEFAULT_NAVBAR_HEIGHT } from "../../constants/dashboardConstants";

const Header = () => {
  return (
    <div 
      className={css.container}
      style={{
        height: `${DEFAULT_NAVBAR_HEIGHT}px`
      }}
    >
      <img
        width={75}
        height={75} 
        src={DogPhoto} 
      />
    </div>
  );
};

export default Header;