import { ReactNode, Children, cloneElement, ReactElement, MouseEvent, useState } from "react";
import { ResizeHandles } from "../../../../constants/dashboardConstants";
import CanvasUtils from "../../../../editor/utils/canvasUtils";
import Point from "../../../../editor/utils/Point";
import Canvas from "../../../EditorView/Canvas/Canvas";

const ResizableGrid = ({ children, width, height, direction }: { 
  children: ReactNode, 
  width: number,
  height: number,
  direction: string }) => {

  const [childElemSizes, setChildElemSizes] = useState<number[]>([
    (1 / 7) * width, 
    (5 / 7) * width, 
    (1 / 7) * width
  ]);
  const [mousePos, setMousePos] = useState<Point>(new Point(0, 0));
  
  const getChildElementSize = (index: number) => {
    if (index < 0 || index >= childElemSizes.length) {
      return 0;
    }

    let totalFrValues: number = childElemSizes.reduce((a, b) => a + b, 0);
    return (childElemSizes[index] / totalFrValues) * width;
  };
  
  const resizeChildElement = (mousePos: Point, index: number) => {
    let elemOffset: number = 0;

    for (let i = 0; i < index; i++) {
      elemOffset += getChildElementSize(i);
    }

    let delta: number = mousePos.x - (elemOffset + getChildElementSize(index));

    let newChildElemSizes: number[] = [...childElemSizes];
    newChildElemSizes[index] = getChildElementSize(index) + delta;
    newChildElemSizes[index + 1] = getChildElementSize(index + 1) - delta;
    setChildElemSizes(newChildElemSizes);
  };

  const onResizeHandleClick = (handle: ResizeHandles, childIndex: number) => {
    if (handle === ResizeHandles.RIGHT) {
      resizeChildElement(mousePos, childIndex);
    }
  };  

  const renderChildren = () => {
    return Children.toArray(children).map((child, index) => {
      return cloneElement(child as ReactElement<any>, { 
        index: index, 
        onResizeHandleClick: (sideClicked: ResizeHandles) => onResizeHandleClick(sideClicked, index),
        enabledHandles: [ResizeHandles.RIGHT]
      });
    });
  }

  const onMouseMove = (e: MouseEvent) => {
    setMousePos(CanvasUtils.mapClientCoordsToMouse(e));
  };

  return (
    <div 
      style={{
        display: "grid",
        gridTemplateColumns: childElemSizes.map((size: number) => `${size}fr`).join(" "),
        gridTemplateRows: height,
      }}
      onMouseMove={onMouseMove}
    > 
      {renderChildren()}
    </div>
  )
};

export default ResizableGrid;