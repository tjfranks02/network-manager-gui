import { MouseEvent, useState } from "react";
import { ResizeHandles } from "../../../constants/dashboardConstants";
import { RESIZE_HANDLE_SIZE } from "../../../constants/dashboardConstants";
import CanvasUtils from "../../../editor/utils/canvasUtils";
import useMousePosition from "../../hooks/useMousePosition";
import Point from "../../../editor/utils/Point";

// Different ways to render this border based on where the mouse is
const IDLE_COLOUR = "#adb5bd";
const HOVER_COLOUR = "#212529";

/**
 * A draggable handle that allows the user to resize a component within a ResizableContainer.
 * 
 * Props:
 *   handleSide: The side of the component that this handle is attached to.
 *   direction: The direction that the parent ResizableContainer is stacked.
 *   onResizeHandleClick: Callback function for when the user clicks on this handle. Handled by
 *   ResizableContainer component.
 */
const ResizeHandle = ({ handleSide, direction, onResizeHandleClick }: { 
  handleSide: ResizeHandles,
  direction: string,
  onResizeHandleClick: (handle: ResizeHandles) => void
}) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [mouseX, mouseY] = useMousePosition();

  const determineHandle = (e: MouseEvent): ResizeHandles => {  
    let rect = e.currentTarget.getBoundingClientRect();

    let mousePos: Point = CanvasUtils.mapClientCoordsToMouse(e);
    let width: number = rect.right - rect.left;
    let height: number = rect.bottom - rect.top;

    let delta = 10;
    
    let newCursor: ResizeHandles = ResizeHandles.DEFAULT;

    if (mousePos.y < delta && handleSide === ResizeHandles.UP) {
      newCursor = ResizeHandles.UP;
    } else if (mousePos.y > height - delta && handleSide === ResizeHandles.DOWN) {
      newCursor = ResizeHandles.DOWN; 
    }
    
    if (mousePos.x < delta && handleSide === ResizeHandles.LEFT) {
      newCursor = ResizeHandles.LEFT;
    } else if (mousePos.x > width - delta && handleSide === ResizeHandles.RIGHT) {
      newCursor = ResizeHandles.RIGHT;
    }

    return newCursor;
  };

  const handleMouseDown = (_: MouseEvent) => {
    onResizeHandleClick(handleSide);
  };

  const handleMouseMove = (_: MouseEvent) => {
  };

  const getHeight = () => {
    return direction === "column" ? "100%" : RESIZE_HANDLE_SIZE;
  };

  const getWidth = () => {
    return direction === "row" ? "100%" : RESIZE_HANDLE_SIZE;
  };

  return (
    <div 
      style={{
        backgroundColor: isActive ? HOVER_COLOUR : IDLE_COLOUR,
        height: getHeight(),
        width: getWidth(),
        zIndex: 100
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
    >
    </div>
  )
};

export default ResizeHandle;