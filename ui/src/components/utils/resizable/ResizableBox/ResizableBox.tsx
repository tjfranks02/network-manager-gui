import { ReactNode, MouseEvent, useState } from "react";

import Point from "../../../../editor/utils/Point";
import { 
  VERTICAL_RESIZE_CURSOR, 
  HORIZONTAL_RESIZE_CURSOR 
} from "../../../../constants/dashboardConstants";

import css from "./styles.module.css";

/**
 * This component is a wrapper around any component that needs to be resizable. When it detects that
 * it is being re-sized, it triggers the onResize function to be handled by its parent component.
 * 
 * Params:
 *   children: The child component that needs to be resizable
 *   onResize: The function that is called when the child component is resized
 */
const ResizableBox = ({ children, onResize }: { 
  children: ReactNode, 
  onResize?: (event: MouseEvent, sideClicked: string) => void
}) => {
  const [cursor, setCursor] = useState("default");

  const mapClientCoordsToMouse = (event: MouseEvent): Point => {
    const bounds = event.currentTarget.getBoundingClientRect();

    const mouseX = event.clientX - bounds.left;
    const mouseY = event.clientY - bounds.top;
    return new Point(mouseX, mouseY);
  };

  const determineCursor = (e: MouseEvent) => {  
    let rect = e.currentTarget.getBoundingClientRect();

    let mousePos: Point = mapClientCoordsToMouse(e);
    let width: number = rect.right - rect.left;
    let height: number = rect.bottom - rect.top;

    let delta = 10;
    
    let newCursor: string = "";

    if (mousePos.y < delta || mousePos.y > height - delta) {
      newCursor += VERTICAL_RESIZE_CURSOR; 
    }
    
    if (mousePos.x < delta || mousePos.x > width - delta) {
      newCursor += HORIZONTAL_RESIZE_CURSOR;
    }
    
    if (!newCursor) {
      newCursor = "default";
    }

    return newCursor;
  };

  const handleMouseDown = (e: MouseEvent) => {
    let newCursor = determineCursor(e);
    setCursor(newCursor);

    if (onResize) {
      onResize(e, cursor);
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    let newCursor = determineCursor(e);
    setCursor(newCursor);
  };

  return (
    <div 
      style={{ cursor: cursor }}
      onClick={handleMouseDown}
      onMouseMove={handleMouseMove}
      className={css.border}
    >
      {children}
    </div>
  );
};

export default ResizableBox;