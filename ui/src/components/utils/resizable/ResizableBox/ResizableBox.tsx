import { ReactNode, MouseEvent, useState } from "react";

import Point from "../../../../editor/utils/Point";
import { ResizeHandles } from "../../../../constants/dashboardConstants";

import css from "./styles.module.css";

/**
 * This component is a wrapper around any component that needs to be resizable. When it detects that
 * it is being re-sized, it triggers the onResize function to be handled by its parent component.
 * 
 * Params:
 *   children: The child component that needs to be resizable
 *   onResize: The function that is called when the child component is resized
 */
const ResizableBox = ({ children, onResize, enabledHandles }: { 
  children: ReactNode, 
  onResize?: (handle: ResizeHandles) => void,
  enabledHandles?: ResizeHandles[]
}) => {
  const [cursor, setCursor] = useState<ResizeHandles>(ResizeHandles.DEFAULT);

  const mapClientCoordsToMouse = (event: MouseEvent): Point => {
    const bounds = event.currentTarget.getBoundingClientRect();

    const mouseX = event.clientX - bounds.left;
    const mouseY = event.clientY - bounds.top;
    return new Point(mouseX, mouseY);
  };

  const isHandleEnabled = (handle: ResizeHandles): boolean => {
    if (!enabledHandles) {
      return true;
    } else {
      return enabledHandles.includes(handle);
    }
  };

  const determineHandle = (e: MouseEvent): ResizeHandles => {  
    let rect = e.currentTarget.getBoundingClientRect();

    let mousePos: Point = mapClientCoordsToMouse(e);
    let width: number = rect.right - rect.left;
    let height: number = rect.bottom - rect.top;

    let delta = 10;
    
    let newCursor: ResizeHandles = ResizeHandles.DEFAULT;

    if (mousePos.y < delta && isHandleEnabled(ResizeHandles.UP)) {
      newCursor = ResizeHandles.UP;
    } else if (mousePos.y > height - delta && isHandleEnabled(ResizeHandles.DOWN)) {
      newCursor = ResizeHandles.DOWN; 
    }
    
    if (mousePos.x < delta && isHandleEnabled(ResizeHandles.LEFT)) {
      newCursor = ResizeHandles.LEFT;
    } else if (mousePos.x > width - delta && isHandleEnabled(ResizeHandles.RIGHT)) {
      newCursor = ResizeHandles.RIGHT;
    }

    return newCursor;
  };

  const handleMouseDown = (e: MouseEvent) => {
    let newCursor: ResizeHandles = determineHandle(e);

    if (newCursor != ResizeHandles.DEFAULT && onResize) {
      onResize(newCursor);
    }
  };

  const handleMouseUp = (e: MouseEvent) => {
    
  };

  const handleMouseMove = (e: MouseEvent) => {
    let newCursor: ResizeHandles = determineHandle(e);
    setCursor(newCursor);
  };

  return (
    <div 
      style={{ 
        cursor: cursor,
        borderTop: "1px solid #adb5bd",
        borderRight: "1px solid #adb5bd",
        borderBottom: "1px solid #adb5bd",
        borderLeft: "1px solid #adb5bd"
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      className={css.border}
    >
      {children}
    </div>
  );
};

export default ResizableBox;