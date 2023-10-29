import { useState, useEffect, RefObject } from "react";

const useResizableDimensions = (wrapperRef: RefObject<HTMLDivElement>) => {
  const [wrapperHeight, setWrapperHeight] = useState<number>(100);
  const [wrapperWidth, setWrapperWidth] = useState<number>(100);

  useEffect(() => {
    if (wrapperRef.current) {
      const resizeObserver = new ResizeObserver(() => {
        setWrapperWidth(wrapperRef.current!.clientWidth);
        setWrapperHeight(wrapperRef.current!.clientHeight);
      });
      resizeObserver.observe(wrapperRef.current);
      return () => resizeObserver.disconnect();
    }
  }, []);

  return [wrapperWidth, wrapperHeight];
};

export default useResizableDimensions;