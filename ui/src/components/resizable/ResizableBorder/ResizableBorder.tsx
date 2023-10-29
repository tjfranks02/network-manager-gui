import { ReactNode, MouseEvent, useState } from "react";

import { ResizeHandles } from "../../../constants/dashboardConstants";
import CanvasUtils from "../../../editor/utils/canvasUtils";
import Point from "../../../editor/utils/Point";

import css from "./styles.module.css";

// Different ways to render this border based on where the mouse is
const IDLE_BORDER = "1px solid #adb5bd";
const HOVER_BORDER = "5px solid #212529";

const ResizableBorder = ({ children, enabledHandles, onResizeHandleClick, onResizeHandleHover }: { 
  children: ReactNode, 
  enabledHandles: ResizeHandles[],
  onResizeHandleClick: (handle: ResizeHandles) => void,
  onResizeHandleHover: (handle: ResizeHandles) => void
}) => {
  const [activeHandle, setActiveHandle] = useState<ResizeHandles>(ResizeHandles.DEFAULT);

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
    let borders = {};

    if (isHandleEnabled(ResizeHandles.DOWN)) {
      borders = { 
        ...borders, 
        borderBottom: activeHandle === ResizeHandles.DOWN ? HOVER_BORDER : IDLE_BORDER 
      };
    } 
    
    if (isHandleEnabled(ResizeHandles.RIGHT)) {
      borders = {
        ...borders,
        borderRight: activeHandle === ResizeHandles.RIGHT ? HOVER_BORDER : IDLE_BORDER
      };
    }

    return borders; 
  };

  const handleMouseDown = (e: MouseEvent) => {
    let newCursor: ResizeHandles = determineHandle(e);
    setActiveHandle(newCursor);

    if (newCursor != ResizeHandles.DEFAULT && onResizeHandleClick) {
      onResizeHandleClick(newCursor);
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    let newCursor: ResizeHandles = determineHandle(e);
    setActiveHandle(newCursor);

    if (onResizeHandleHover) {
      onResizeHandleHover(determineHandle(e));
    }
  };

  return (
    <div 
      style={{
        ...getBorders(),
        backgroundColor: "white",
        zIndex: 99999999999,
        position: "relative"
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setActiveHandle(ResizeHandles.DEFAULT)}
    >
      {children}  
      {/* <div className={css.verticalLine}></div> */}
    </div>
  )
};

export default ResizableBorder;