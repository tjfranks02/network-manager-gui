import { useState, useEffect } from "react";

/**
 * Hook for getting the x and y coordinates of the mouse.
 * 
 * Returns:
 *   x - the x coord of the mouse in the document.
 *   y - the y coord of the mouse in the document.
 */
const useMousePosition = () => {
  const [x, setX] = useState<number>(0);
  const [y, setY] = useState<number>(0);

  useEffect(() => {
    const updateMousePos = (e: MouseEvent) => {
      setX(e.pageX);
      setY(e.pageY);
    };

    document.addEventListener("mousemove", updateMousePos);
    return () => document.removeEventListener("mousemove", updateMousePos);
  }, []);

  return [x, y];
};

export default useMousePosition;