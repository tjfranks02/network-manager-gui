import css from "./styles.module.css";

const UserProfileCircle = () => {
  return (
    <div className={css.container}>
      <img
        className={css.icon}
        src="https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png" 
      />
    </div>
  );
};

export default UserProfileCircle;