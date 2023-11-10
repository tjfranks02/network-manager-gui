import { useEffect, useState, useRef } from "react";
import { ResizeHandles } from "../../../constants/dashboardConstants";
import { RESIZE_HANDLE_SIZE } from "../../../constants/dashboardConstants";
import useMousePosition from "../../hooks/useMousePosition";
import Point from "../../../editor/utils/Point";

// Different ways to render this border based on where the mouse is
const IDLE_COLOUR = "#adb5bd";
const HOVER_COLOUR = "#212529";

// The distance from the edge of the component that the mouse must be within to trigger a resize
const RESIZE_HANDLE_DELTA = 3;

/**
 * Helper to determine if a number is between two bounds.
 * 
 * Params:
 *   x: The number to check.
 *   min: The minimum bound.
 *   max: The maximum bound.
 */
const between = (x: number, min: number, max: number) => {
  return x >= min && x <= max;
};

/**
 * A draggable handle that allows the user to resize a component within a ResizableContainer.
 * 
 * Props:
 *   handleSide: The side of the component that this handle is attached to.
 *   direction: The direction that the parent ResizableContainer is stacked.
 *   onResizeHandleChange: Callback function to be called when a user either enters or leaves this
 *   handle within a certain delta.
 *   ResizableContainer component.
 */
const ResizeHandle = ({ handleSide, direction, onResizeHandleChange }: { 
  handleSide: ResizeHandles,
  direction: string,
  onResizeHandleChange: (handle: ResizeHandles) => void
}) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [mouseX, mouseY] = useMousePosition();

  const [prevCursor, setPrevCursor] = useState<ResizeHandles>(ResizeHandles.DEFAULT);

  const handleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cursor: ResizeHandles = determineHandle();

    if (cursor !== prevCursor) {
      setPrevCursor(cursor);
      onResizeHandleChange(cursor);
    }

    setIsActive(cursor !== ResizeHandles.DEFAULT);
  }, [mouseX, mouseY]);

  const determineHandle = (): ResizeHandles => {  
    let rect = handleRef.current!.getBoundingClientRect();
    let mousePos: Point = new Point(mouseX, mouseY);
    
    let newCursor: ResizeHandles = ResizeHandles.DEFAULT;

    if (handleSide === ResizeHandles.UP 
        && Math.abs(mousePos.y - rect.top) < RESIZE_HANDLE_DELTA 
        && between(mousePos.x, rect.left, rect.right)) {
      newCursor = ResizeHandles.UP;
    } else if (handleSide === ResizeHandles.DOWN
        && Math.abs(mousePos.y - rect.bottom) < RESIZE_HANDLE_DELTA
        && between(mousePos.x, rect.left, rect.right)) {
      newCursor = ResizeHandles.DOWN; 
    }
    
    if (handleSide === ResizeHandles.LEFT 
        && Math.abs(mousePos.x - rect.left) < RESIZE_HANDLE_DELTA
        && between(mousePos.y, rect.top, rect.bottom)) {
      newCursor = ResizeHandles.LEFT;
    } else if (handleSide === ResizeHandles.RIGHT 
        && Math.abs(mousePos.x - rect.right) < RESIZE_HANDLE_DELTA
        && between(mousePos.y, rect.top, rect.bottom)) {
      newCursor = ResizeHandles.RIGHT;
    }

    return newCursor;
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
      ref={handleRef}
      onDragStart={() => false}
    >
    </div>
  )
};

export default ResizeHandle;