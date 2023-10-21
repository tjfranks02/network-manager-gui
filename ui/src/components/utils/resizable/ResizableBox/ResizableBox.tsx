import { ReactNode, MouseEvent, useState, Children } from "react";
import Point from "../../../../editor/utils/Point";

import css from "./styles.module.css";

const ResizableBox = ({ children, onResize }: { 
  children: ReactNode, 
  onResize: (direction: string, index: number) => void | null
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
    
    if (newCursor) {
      setCursor(newCursor + "-resize");
    } else {
      setCursor("default"); 
    }                               
  };

  return (
    <div 
      style={{ cursor: cursor }}
      onMouseMove={(e) => determineCursor(e)}
      className={css.border}
    >
      {children}
    </div>
  );
};

export default ResizableBox;