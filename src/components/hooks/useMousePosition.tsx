import { useState, useEffect } from "react";

/**
 * Hook for getting the width and height of the document.
 * 
 * Returns:
 *   width - the width of the document
 *   height - the height of the document
 */
const useMousePosition = () => {
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);

  useEffect(() => {
    document.addEventListener('mousemove', (e) => {
      setWidth(e.pageX);
      setHeight(e.pageY);
    });
  }, []);

  return [width, height];
};

export default useMousePosition;