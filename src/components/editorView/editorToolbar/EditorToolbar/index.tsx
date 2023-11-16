import { FiSave } from "react-icons/fi";
import { IoMdUndo, IoMdRedo } from "react-icons/io";

import css from "./styles.module.css"

const TOOLBAR_ITEMS = {
};  

const EditorToolbar = () => {
  return (
    <div className={css.container}>
      <div className={css.undoOptionsBox}>
        <IoMdUndo className={css.icon} />
        <IoMdRedo className={css.icon} />
      </div>
      <FiSave className={css.icon} />
    </div>
  );
};

export default EditorToolbar;