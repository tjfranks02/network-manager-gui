import { 
  ReactNode,
  ReactElement,
  Children, 
  MouseEvent, 
  useState, 
  useEffect,
  useRef,
  cloneElement,
  Fragment
} from "react";
import { ResizeHandles } from "../../../constants/dashboardConstants";
import CanvasUtils from "../../../editor/utils/canvasUtils";
import Point from "../../../editor/utils/Point";
import ResizeHandle from "../ResizeHandle/ResizeHandle";
import useResizableDimensions from "../../hooks/useResizableDimensions";
import { RESIZE_HANDLE_SIZE } from "../../../constants/dashboardConstants";

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
  height?: number,
  isResizeContainer: Boolean
}) => {
  const getMainAxisSize = () => {
    let axisSize: number = 0;
    let handlesSize: number = (Children.count(children) - 1) * RESIZE_HANDLE_SIZE;

    if (direction === "row") {
      axisSize = height ? height : wrapperHeight;
    } else {
      axisSize = width ? width : wrapperWidth;
    }

    return axisSize - handlesSize;
  };

  const getDefaultChildElemSizes = (): number[] => {
    let childSizes = [];
  
    for (let i = 0; i < Children.count(children); i++) {
      childSizes.push((1 / Children.count(children)) * getMainAxisSize());
    }
  
    return childSizes;
  };

  const wrapperRef = useRef<HTMLDivElement>(null);
  const [wrapperWidth, wrapperHeight] = useResizableDimensions(wrapperRef);

  const [childElemSizes, setChildElemSizes] = useState<number[]>(getDefaultChildElemSizes());
  const [mousePos, setMousePos] = useState<Point>(new Point(0, 0));

  const [hoveredChildElement, setHoveredChildElement] = useState<number | null>(null);
  const [activeChildElement, setActiveChildElement] = useState<number | null>(null);
  const [cursor, setCursor] = useState<ResizeHandles>(ResizeHandles.DEFAULT);

  useEffect(() => {
    // If this ResizableContainer isn't the child of a another ResizableContainer.
    if (!width && !height) {
      setChildElemSizes(getDefaultChildElemSizes());
    }
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
      elemOffset += getChildElementSize(i) + RESIZE_HANDLE_SIZE;
    }

    let mainAxisMouseCoord: number = direction === "column" ? mousePos.x : mousePos.y;
    let delta: number = mainAxisMouseCoord - (elemOffset + getChildElementSize(index));

    let newChildElemSizes: number[] = [...childElemSizes];
    newChildElemSizes[index] = getChildElementSize(index) + delta;
    newChildElemSizes[index + 1] = getChildElementSize(index + 1) - delta;
    setChildElemSizes(newChildElemSizes);
  };

  const getChildElemHeight = (index: number) => {
    if (direction === "row") {
      return getChildElementSize(index);
    } else {
      return height ? height : wrapperHeight;
    }
  };

  const getChildElemWidth = (index: number) => {
    if (direction === "column") {
      return getChildElementSize(index);
    } else {
      return width ? width : wrapperWidth;
    }
  };

  const getGridTemplateRows = () => {
    let gridTemplateRows: string = "";

    if (direction === "row") {
      gridTemplateRows = childElemSizes.map((size: number, index: number) => {
        return index !== childElemSizes.length - 1 ? 
          `${size}fr ${RESIZE_HANDLE_SIZE}fr` : 
          `${size}fr`;
      }).join(" ");
    } else {
      gridTemplateRows = height ? `${height}px` : `${wrapperHeight}px`;
    }
    
    return gridTemplateRows;
  };

  const getGridTemplateColumns = () => {
    let gridTemplateColumns: string = "";

    if (direction === "column") {
      gridTemplateColumns = childElemSizes.map((size: number, index: number) => {
        return index !== childElemSizes.length - 1 ? 
          `${size}fr ${RESIZE_HANDLE_SIZE}fr` : 
          `${size}fr`;
      }).join(" ");
    } else {
      gridTemplateColumns = width ? `${width}px` : `${wrapperWidth}px`;
    }

    return gridTemplateColumns;
  };

  const handleResizeHandleChange = (handle: ResizeHandles, index: number) => {
    if (activeChildElement === null) {
      setCursor(handle);
    }

    setHoveredChildElement(handle === ResizeHandles.DEFAULT ? null : index);
  };

  const handleMouseMove = (e: MouseEvent) => {
    setMousePos(CanvasUtils.mapClientCoordsToMouse(e));

    if (activeChildElement !== null) {
      resizeChildElement(activeChildElement);
    }
  };

  const handleMouseUp = (_: MouseEvent) => {
    setActiveChildElement(null);
    setCursor(ResizeHandles.DEFAULT);
  };

  const handleMouseDown = (_: MouseEvent) => {
    setActiveChildElement(hoveredChildElement);
  };

  /**
   * Renders each child element underneath this container. If the child is a ResizableContainer,
   * we give it its own width and height props. This is to ensure there is no delay in resizing when
   * the parent width and height changes.
   * 
   * Returns:
   *   The rendered child elements.
   */
  const renderChildren = () => {
    return Children.toArray(children).map((child, index) => {
      let childElem = child;

      if ((child as any).props.isResizeContainer) {
        childElem = cloneElement(child as ReactElement, { 
          width: getChildElemWidth(index),
          height: getChildElemHeight(index)
        });
      }

      return (
        <Fragment key={index}>
          {childElem}
          {index !== Children.count(children) - 1 && <ResizeHandle 
            handleSide={direction === "row" ? ResizeHandles.DOWN : ResizeHandles.RIGHT}
            direction={direction}
            onResizeHandleChange={(handle: ResizeHandles) => handleResizeHandleChange(handle, index)} 
            isActive={hoveredChildElement === index || activeChildElement === index}
          />}
        </Fragment>
      );
    });
  }

  const getStyle = (): any => {
    let style: any = {
      display: "grid",
      gridTemplateColumns: getGridTemplateColumns(),
      gridTemplateRows: getGridTemplateRows(),
      width: "100%",
      height: "100%",
      backgroundColor: "white"
    };
    
    return cursor !== ResizeHandles.DEFAULT ? {...style, cursor} : style;
  };

  return (
    <div 
      style={getStyle()}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseDown={handleMouseDown}
      ref={wrapperRef}
    > 
      {renderChildren()}
    </div>
  )
};

ResizableContainer.defaultProps = {
  isResizeContainer: true
};

export default ResizableContainer;