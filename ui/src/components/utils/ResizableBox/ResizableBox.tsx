import { ReactNode } from "react";

import css from "./styles.module.css";

const ResizableBox = ({ children }: { children: ReactNode}) => {
  return (
    <div className={css.border}>
      {children}
    </div>
  );
};

export default ResizableBox;