import { 
  ReactNode,
  ReactElement,
  Children, 
  MouseEvent, 
  useState, 
  useEffect,
  useRef,
  cloneElement
} from "react";
import { ResizeHandles } from "../../../constants/dashboardConstants";
import CanvasUtils from "../../../editor/utils/canvasUtils";
import Point from "../../../editor/utils/Point";
import ResizableBorder from "../ResizableBorder/ResizableBorder";
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
 *   width: The total width of this ResizableContainer. Optionally provided by a parent 
 *   ResizableContainer component.
 *   height: The total fixed height of this ResizableContainer component. Optionally provided by a 
 *   parent ResizableContainer component.
 */
const ResizableContainer = ({ children, direction, width, height }: { 
  children: ReactNode, 
  direction: string,
  width?: number,
  height?: number
}) => {
  const getMainAxisSize = () => {
    if (direction === "row") {
      return height ? height : wrapperHeight;
    } else {
      return width ? width : wrapperWidth;
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

    if (direction === "row" && index != Children.count(children) - 1) {
      enabledHandles = [ResizeHandles.DOWN];
    } else if (direction === "column" && index != Children.count(children) - 1) {
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

  const handleMouseUp = (_: MouseEvent) => {
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
      return width ? `${width}px` : `${wrapperWidth}px`;
    }
  };

  const getChildElemHeight = (index: number) => {
    if (direction === "row") {
      return getChildElementSize(index) - 1;
    } else {
      return height ? height : wrapperHeight - 1;
    }
  };

  const getChildElemWidth = (index: number) => {
    if (direction === "column") {
      return getChildElementSize(index) - 1;
    } else {
      return width ? width : wrapperWidth - 1;
    }
  };

  const getGridTemplateRows = () => {
    if (direction === "row") {
      return childElemSizes.map((size: number) => `${size}px`).join(" ");
    } else {
      return height ? `${height}px` : `${wrapperHeight}px`;
    }
  };

  const renderChildren = () => {
    return Children.toArray(children).map((child, index) => {
      let childElem = child;

      if ((child as any).type.name === "ResizableContainer") {
        childElem = cloneElement(child as ReactElement, { 
          width: getChildElemWidth(index),
          height: getChildElemHeight(index)
        });
      }

      return (
        <ResizableBorder
          key={index}
          enabledHandles={getEnabledResizeHandles(index)}
          onResizeHandleClick={(handle: ResizeHandles) => handleResizeHandleClick(handle, index)}
          onResizeHandleHover={(handle: ResizeHandles) => handleResizeHandleHover(handle)}
        >
          {childElem}
        </ResizableBorder>
      );
    });
  }

  /**
   * This is silly but it solves the issue of the cursor being overriden when we have nested
   * ResizableContainers.
   * 
   * Returns:
   *   The style for this component. With cursor if not default.
   */
    const getStyle = (): any => {
      let style: any = {
        display: "grid",
        gridTemplateColumns: getGridTemplateColumns(),
        gridTemplateRows: getGridTemplateRows(),
        width: "100%",
        height: "100%",
        backgroundColor: direction === "white"
      };
  
      if (cursor != ResizeHandles.DEFAULT) {
        style = { ...style, cursor: cursor };
      }
      
      return style;
    };

  return (
    <div 
      style={getStyle()}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      ref={wrapperRef}
    > 
      {renderChildren()}
    </div>
  )
};

export default ResizableContainer;