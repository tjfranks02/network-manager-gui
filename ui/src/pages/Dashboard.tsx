import React, { useState, useRef, useEffect, MouseEvent } from 'react';
import Point from "../utils/Point";
import View from "../view/View";

const defaultCanvasState = {
  mousePos: new Point(0, 0)
};

const CanvasController = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvasState, setCanvasState] = useState(defaultCanvasState);

  const [view, setView] = useState<View | null>(new View());

  useEffect(() => {
    if (view) {
      view.draw(canvasRef.current!.getContext('2d')!, canvasState); 
    }
  }, [view]);

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

    if (view) {
      view.handleMouseMove(getContext(), newCanvasState);
    }
  };

  const handleMouseDown = (event: MouseEvent<HTMLCanvasElement>): void => {
    let mousePos = mapClientCoordsToMouse(event);
    let newCanvasState = {...canvasState, mousePos};
    
    if (view) {
      view.handleMouseDown(getContext(), newCanvasState);
    }
  };

  const handleMouseUp = (): void => {
  };

  const clearCanvas = (): void => {
    let ctx = getContext();
    ctx.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
    ctx.beginPath();
  };
  
  return (
    <canvas 
      style={{ 
        border: "2px solid #0000ff", 
        borderRadius: 10, 
        margin: 10
      }} 
      ref={canvasRef} 
      width={900}
      height={375}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    />
  );
}

export default CanvasController;