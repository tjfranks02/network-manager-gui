import { useState, useRef, MouseEvent, WheelEvent, DragEvent, useEffect } from 'react';
import Point from "../../../editor/utils/Point";
import EditorController from "../../../editor/controller/EditorController";
import { CanvasState } from '../../../editor/types';
import { useSelector } from "react-redux";
import { RootState } from '../../../redux/store';

import css from "./styles.module.css";

const defaultCanvasState = {
  mousePos: new Point(0, 0),
};

const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvasState, setCanvasState] = useState<CanvasState>(defaultCanvasState);

  const currDraggedElem = useSelector((state: RootState) => state.currentDraggedElement.element);

  useEffect(() => {
    EditorController.draw(getContext(), canvasState);
  }, []);

  const getContext = (): CanvasRenderingContext2D => {
    return canvasRef.current!.getContext('2d')!;
  };

  const mapClientCoordsToMouse = (event: MouseEvent<HTMLCanvasElement>): Point => {
    const bounds = event.currentTarget.getBoundingClientRect();

    const mouseX = event.clientX - bounds.left;
    const mouseY = event.clientY - bounds.top;
    return new Point(mouseX, mouseY);
  };

  const handleMouseMove = (event: MouseEvent<HTMLCanvasElement>): void => {
    clearCanvas();

    let mousePos = mapClientCoordsToMouse(event);
    let newCanvasState = {...canvasState, mousePos};
    
    setCanvasState(newCanvasState);

    EditorController.handleMouseMove(getContext(), newCanvasState);
  };

  const handleMouseDown = (event: MouseEvent<HTMLCanvasElement>): void => {
    let mousePos = mapClientCoordsToMouse(event);
    let newCanvasState = {...canvasState, mousePos};
    
    clearCanvas();
    EditorController.handleMouseDown(getContext(), newCanvasState);
  };

  const handleMouseUp = (event: MouseEvent<HTMLCanvasElement>): void => {
    let mousePos = mapClientCoordsToMouse(event);
    let newCanvasState = {...canvasState, mousePos};

    EditorController.handleMouseUp(getContext(), newCanvasState);
  };

  const onDraggedElementDrop = (event: DragEvent<HTMLCanvasElement>) => {
    EditorController.createElement(currDraggedElem, canvasState);
  };

  const clearCanvas = (): void => {
    let ctx = getContext();
    ctx.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
    ctx.beginPath();
  };

  const handleDragOver = (event: DragEvent<HTMLCanvasElement>) => {
    event.preventDefault();

    let mousePos = mapClientCoordsToMouse(event);
    let newCanvasState = {...canvasState, mousePos};
    setCanvasState(newCanvasState);
  };

  const handleMouseWheelMove = (event: WheelEvent<HTMLCanvasElement>): void => {
    EditorController.handleMouseWheelScroll(event.deltaY);
  };
  
  return (
    <canvas 
      className={css.canvas}
      ref={canvasRef} 
      width={900}
      height={375}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      onDragOver={(e) => handleDragOver(e)}
      onDrop={(e) => onDraggedElementDrop(e)}
      onWheel={(e) => handleMouseWheelMove(e)}
    />
  );
}

export default Canvas;