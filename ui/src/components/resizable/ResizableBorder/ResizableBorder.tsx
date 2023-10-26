import { ReactNode, useState, MouseEvent } from "react";

import { ResizeHandles } from "../../../constants/dashboardConstants";
import CanvasUtils from "../../../editor/utils/canvasUtils";
import Point from "../../../editor/utils/Point";

const ResizableBorder = ({ children, enabledHandles, onResizeHandleClick, onResizeHandleHover }: { 
  children: ReactNode, 
  enabledHandles: ResizeHandles[],
  onResizeHandleClick: (handle: ResizeHandles) => void,
  onResizeHandleHover: (handle: ResizeHandles) => void
}) => {

  const isHandleEnabled = (handle: ResizeHandles): boolean => {
    if (!enabledHandles) {
      return true;
    } else {
      return enabledHandles.includes(handle);
    }
  };

  const determineHandle = (e: MouseEvent): ResizeHandles => {  
    let rect = e.currentTarget.getBoundingClientRect();

    let mousePos: Point = CanvasUtils.mapClientCoordsToMouse(e);
    let width: number = rect.right - rect.left;
    let height: number = rect.bottom - rect.top;

    let delta = 25;
    
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

  const getBorders = () => {
    let borders = {
      borderTop: isHandleEnabled(ResizeHandles.UP) ? "1px solid #adb5bd" : "none",
      borderRight: isHandleEnabled(ResizeHandles.RIGHT) ? "1px solid #adb5bd" : "none",
      borderBottom: isHandleEnabled(ResizeHandles.DOWN) ? "1px solid #adb5bd" : "none",
      borderLeft: isHandleEnabled(ResizeHandles.LEFT) ? "1px solid #adb5bd" : "none"
    };

    return borders; 
  };

  const handleMouseDown = (e: MouseEvent) => {
    let newCursor: ResizeHandles = determineHandle(e);

    if (newCursor != ResizeHandles.DEFAULT && onResizeHandleClick) {
      onResizeHandleClick(newCursor);
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (onResizeHandleHover) {
      onResizeHandleHover(determineHandle(e));
    }
  };

  return (
    <div 
      style={{
        ...getBorders(),
        backgroundColor: "white"
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
    >
      {children}
    </div>
  )
};

export default ResizableBorder;