import { 
  ReactNode,
  Children, 
  cloneElement, 
  ReactElement, 
  MouseEvent, 
  useState, 
  useEffect,
  useRef
} from "react";
import { ResizeHandles } from "../../../constants/dashboardConstants";
import CanvasUtils from "../../../editor/utils/canvasUtils";
import Point from "../../../editor/utils/Point";

import css from "./styles.module.css";
import useResizableDimensions from "../../hooks/useResizableDimensions";

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
const ResizableContainer = ({ children, direction }: { children: ReactNode, direction: string }) => {
  const getMainAxisSize = () => {
    if (direction === "row") {
      return wrapperHeight;
    } else {
      return wrapperWidth;
    }
  };

  const getChildElemSizes = (): number[] => {
    let childSizes = [];
  
    for (let i = 0; i < Children.count(children); i++) {
      childSizes.push((1 / Children.count(children)) * getMainAxisSize());
    }
  
    return childSizes;
  };

  const wrapperRef = useRef<HTMLDivElement>(null);
  const [wrapperWidth, wrapperHeight] = useResizableDimensions(wrapperRef);

  const [childElemSizes, setChildElemSizes] = useState<number[]>(getChildElemSizes());
  const [mousePos, setMousePos] = useState<Point>(new Point(0, 0));
  const [activeChildElement, setActiveChildElement] = useState<number | null>(null);
  const [cursor, setCursor] = useState<ResizeHandles>(ResizeHandles.DEFAULT);

  useEffect(() => {
    setChildElemSizes(getChildElemSizes());
  }, [wrapperWidth, wrapperHeight]);

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

    let mainAxisMouseCoord: number = direction === "column" ? mousePos.x : mousePos.y;
    let delta: number = mainAxisMouseCoord - (elemOffset + getChildElementSize(index));

    let newChildElemSizes: number[] = [...childElemSizes];
    newChildElemSizes[index] = getChildElementSize(index) + delta;
    newChildElemSizes[index + 1] = getChildElementSize(index + 1) - delta;
    setChildElemSizes(newChildElemSizes);
  };

  const handleResizeHandleClick = (handle: ResizeHandles, childIndex: number) => {
    setActiveChildElement(childIndex);
    setCursor(handle);
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
      return `${wrapperWidth}px`;
    }
  };

  const getGridTemplateRows = () => {
    if (direction === "row") {
      return childElemSizes.map((size: number) => `${size}px`).join(" ");
    } else {
      return `${wrapperHeight}px`;
    }
  };

  const renderChildren = () => {
    return Children.toArray(children).map((child, index) => {
      return cloneElement(child as ReactElement<any>, { 
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
        cursor: cursor,
        width: "100%",
        height: "100%"
      }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      ref={wrapperRef}
    > 
      {renderChildren()}
    </div>
  )
};

export default ResizableContainer;