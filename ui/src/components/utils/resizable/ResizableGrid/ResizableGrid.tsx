import { ReactNode, Children, cloneElement, ReactElement, MouseEvent } from "react";
import { 
  VERTICAL_RESIZE_CURSOR, 
  HORIZONTAL_RESIZE_CURSOR 
} from "../../../../constants/dashboardConstants";
import CanvasUtils from "../../../../editor/utils/canvasUtils";
import Point from "../../../../editor/utils/Point";

const ResizableGrid = ({ children, height }: { children: ReactNode, height: number }) => {

  const onChildResize = (e: MouseEvent, cursor: string, childIndex: number) => {
    let mousePos: Point = CanvasUtils.mapClientCoordsToMouse(e);

    // TODO
    // Get the current width of the child element that was clicked
    // Alter the width of the clicked element based on the mouse position
    // Alter the width of the neighbouring elements based on the mouse position

    if (cursor.includes(VERTICAL_RESIZE_CURSOR)) {
      console.log("vertical resize")
    } else if (cursor.includes(HORIZONTAL_RESIZE_CURSOR)) {
      console.log("horizontal resize")
    }
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