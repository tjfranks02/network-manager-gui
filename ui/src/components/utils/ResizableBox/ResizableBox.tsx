import { ReactNode, MouseEvent, useState } from "react";
import Point from "../../../editor/utils/Point";

import css from "./styles.module.css";

const ResizableBox = ({ children, onResize, width, height }: { 
  children: ReactNode, 
  onResize: () => void,
  width: number,
  height: number
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

    if (mousePos.y < delta) {
      newCursor += "n"; 
    } else if (mousePos.y > height - delta) {
      newCursor += "s";
    }
    
    if (mousePos.x < delta) {
      newCursor += "w";
    } else if (mousePos.x > width - delta) {
      newCursor += "e";
    }
    console.log(cursor)
    
    if (newCursor) {
      setCursor(newCursor + "-resize");
    } else {
      setCursor("default"); 
    }                               
  };

  return (
    <div 
      style={{ 
        cursor: cursor,
        flexBasis: `${width}px`,
        height: `${height}px`
      }}
      onMouseMove={(e) => determineCursor(e)}
      className={css.border}
    >
      {children}
    </div>
  );
};

export default ResizableBox;