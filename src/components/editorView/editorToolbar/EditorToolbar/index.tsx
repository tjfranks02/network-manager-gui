import { FiSave } from "react-icons/fi";

import css from "./styles.module.css"

const TOOLBAR_ITEMS = {
};  

const EditorToolbar = () => {
  return (
    <div className={css.container}>
      <FiSave className={css.saveIcon} />
    </div>
  );
};

export default EditorToolbar;