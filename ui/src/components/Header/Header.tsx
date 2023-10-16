import DogPhoto from "../../assets/dogWithSunnies.png";
import css from "./styles.module.css";

const Header = () => {
  return (
    <div className={css.container}>
      <img
        width={75}
        height={75} 
        src={DogPhoto} 
      />
    </div>
  );
};

export default Header;