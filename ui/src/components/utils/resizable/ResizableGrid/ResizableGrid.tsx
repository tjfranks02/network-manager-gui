import { ReactNode, Children, cloneElement, ReactElement } from "react";

const ResizableGrid = ({ children, height }: { children: ReactNode, height: number }) => {

  const onChildResize = (sideClicked: string, childIndex: number) => {
    console.log(sideClicked)
    console.log(childIndex)
  };  

  const renderChildren = () => {
    return Children.toArray(children).map((child, index) => {
      return cloneElement(child as ReactElement<any>, { 
        index: index, 
        onResize: (sideClicked: string) => onChildResize(sideClicked, index)
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