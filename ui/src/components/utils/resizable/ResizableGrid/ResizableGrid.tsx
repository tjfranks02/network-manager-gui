import { ReactNode, Children, cloneElement, ReactElement } from "react";

const ResizableGrid = ({ children, height }: { children: ReactNode, height: number }) => {
  
  

  const renderChildren = () => {
    return Children.toArray(children).map((child, index) => {
      console.log(child)
      return cloneElement(child as ReactElement<any>, { 
        index: index, 
        onClick: () => console.log("clicked")
      });
    });
  }

  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "1fr 5fr 1fr",
      gridTemplateRows: height,
    }}> 
      {renderChildren()}
    </div>
  )
};

export default ResizableGrid;