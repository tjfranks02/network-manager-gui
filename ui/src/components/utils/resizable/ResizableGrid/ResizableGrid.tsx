import { ReactNode, Children, cloneElement, ReactElement, MouseEvent } from "react";
import { 
  VERTICAL_RESIZE_CURSOR, 
  HORIZONTAL_RESIZE_CURSOR 
} from "../../../../constants/dashboardConstants";

const ResizableGrid = ({ children, height }: { children: ReactNode, height: number }) => {

  const onChildResize = (e: MouseEvent, cursor: string, childIndex: number) => {
    console.log(cursor)
    console.log(childIndex)
    console.log(e);
  };  

  const renderChildren = () => {
    return Children.toArray(children).map((child, index) => {
      return cloneElement(child as ReactElement<any>, { 
        index: index, 
        onResize: (e: MouseEvent, sideClicked: string) => onChildResize(e, sideClicked, index)
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