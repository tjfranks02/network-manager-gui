import { ReactNode } from "react";

const EditableTextField = ({ children }: { children: ReactNode }) => {
  return (
    <span>{children}</span>
  );
};

export default EditableTextField;