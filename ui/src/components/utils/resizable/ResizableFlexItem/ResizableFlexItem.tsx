import { ReactNode } from "react";

const ResizableFlexItem = ({ children, flexGrow }: { children: ReactNode, flexGrow: number }) => {
  return (
    <div style={{ flexGrow: flexGrow }}>
      {children}
    </div>
  );
};

export default ResizableFlexItem; 