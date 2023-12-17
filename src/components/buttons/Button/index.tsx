import type { MouseEvent, ReactNode } from "react";

import css from "./styles.module.css";

type ButtonProps = {
  children: ReactNode;
  onClick: (event: MouseEvent) => void;
};

const Button = ({ children, onClick }: ButtonProps) => {
  return (
    <button 
      onClick={onClick}
      className={css.button}
    >
      {children}
    </button>
  )
};

export default Button;