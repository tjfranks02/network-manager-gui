import { FiSave } from "react-icons/fi";
import { IoMdUndo, IoMdRedo } from "react-icons/io";

import css from "./styles.module.css"

const TOOLBAR_ITEMS = {
};  

const EditorToolbar = () => {
  const handleTopologySave = () => {

  };

  const handleUndoClick = () => {

  };

  const handleRedoClick = () => {

  };

  return (
    <div className={css.container}>
      <div className={css.undoOptionsBox}>
        <IoMdUndo 
          className={css.icon}
          onClick={handleUndoClick}
        />
        <IoMdRedo 
          className={css.icon} 
          onClick={handleRedoClick}
        />
      </div>
      <FiSave 
        className={css.icon} 
        onClick={handleTopologySave}
      />
    </div>
  );
};

export default EditorToolbar;