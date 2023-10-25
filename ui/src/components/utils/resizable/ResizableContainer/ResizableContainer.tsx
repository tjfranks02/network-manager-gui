import { ReactNode, Children, cloneElement, ReactElement, MouseEvent, useState } from "react";
import { ResizeHandles } from "../../../../constants/dashboardConstants";
import CanvasUtils from "../../../../editor/utils/canvasUtils";
import Point from "../../../../editor/utils/Point";

/**
 * A resizable 2D container for ReziableBox components. Acts similar to a flexbox where you can
 * specify the direction that elements are stacked.
 * 
 * Requires that a fixed width OR height be specified. This allows child ResizableBox components to
 * be resized within this fixed container size.
 * 
 * Props:
 *   children: Children to make resizable. Child components of this component must be a ResizableBox
 *   component.
 *   width: The total width of this ResizableContainer
 *   height: The total fixed height of this ResizableContainer component.
 */
const ResizableContainer = ({ children, width, height, direction }: { 
  children: ReactNode, 
  width: number,
  height: number,
  direction: string }) => {
  
  const getMainAxisSize = () => {
    if (direction === "row") {
      return height;
    } else {
      return width;
    }
  };

  const getDefaultChildElemSizes = (): number[] => {
    let defaultChildSizes = [];

    for (let i = 0; i < Children.count(children); i++) {
      defaultChildSizes.push((1 / Children.count(children)) * getMainAxisSize());
    }

    return defaultChildSizes;
  };

  const [childElemSizes, setChildElemSizes] = useState<number[]>(getDefaultChildElemSizes());
  const [mousePos, setMousePos] = useState<Point>(new Point(0, 0));
  const [activeChildElement, setActiveChildElement] = useState<number | null>(null);
  const [cursor, setCursor] = useState<ResizeHandles>(ResizeHandles.DEFAULT);

  const getChildElementSize = (index: number) => {
    if (index < 0 || index >= childElemSizes.length) {
      return 0;
    }

    let totalFrValues: number = childElemSizes.reduce((a, b) => a + b, 0);
    return (childElemSizes[index] / totalFrValues) * getMainAxisSize();
  };
  
  const resizeChildElement = (index: number) => {
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

  const handleResizeHandleClick = (handle: ResizeHandles, childIndex: number) => {
    setActiveChildElement(childIndex);
    setCursor(handle);

    if (handle === ResizeHandles.RIGHT) {
      resizeChildElement(childIndex);
    }
  };  

  const getEnabledResizeHandles = (index: number): ResizeHandles[] => {
    let enabledHandles: ResizeHandles[] = [];

    if (direction === "row" && index != Children.count(children)) {
      enabledHandles = [ResizeHandles.DOWN];
    } else if (direction === "column" && index != Children.count(children)) {
      enabledHandles = [ResizeHandles.RIGHT];
    }

    return enabledHandles;
  };

  const handleMouseMove = (e: MouseEvent) => {
    setMousePos(CanvasUtils.mapClientCoordsToMouse(e));

    if (activeChildElement !== null) {
      resizeChildElement(activeChildElement);
    }
  };

  const handleMouseUp = (e: MouseEvent) => {
    setActiveChildElement(null);
  };

  const handleResizeHandleHover = (handle: ResizeHandles) => {
    if (activeChildElement === null) {
      setCursor(handle);
    }
  };
  
  const getGridTemplateColumns = () => {
    if (direction === "column") {
      return childElemSizes.map((size: number) => `${size}px`).join(" ");
    } else {
      return `${width}px`;
    }
  };

  const getGridTemplateRows = () => {
    if (direction === "row") {
      return childElemSizes.map((size: number) => `${size}px`).join(" ");
    } else {
      return `${height}px`;
    }
  };

  const renderChildren = () => {
    return Children.toArray(children).map((child, index) => {
      return cloneElement(child as ReactElement<any>, { 
        index: index, 
        onResizeHandleClick: (handle: ResizeHandles) => handleResizeHandleClick(handle, index),
        enabledHandles: getEnabledResizeHandles(index),
        onResizeHandleHover: (handle: ResizeHandles) => handleResizeHandleHover(handle)
      });
    });
  }

  return (
    <div 
      style={{
        display: "grid",
        gridTemplateColumns: getGridTemplateColumns(),
        gridTemplateRows: getGridTemplateRows(),
        cursor: cursor
      }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    > 
      {renderChildren()}
    </div>
  )
};

export default ResizableContainer;