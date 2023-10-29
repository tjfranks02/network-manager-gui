import Point from "./Point";
import { MouseEvent } from "react";

class CanvasUtils {
  static isMouseInRangeOfPoint(mousePoint: Point, targetPoint: Point, threshold: number): boolean {
    // Calculate Euclidean distance between points
    let a = Math.abs(mousePoint.x - targetPoint.x);
    let b = Math.abs(mousePoint.y - targetPoint.y);
    let distance = Math.sqrt( a*a + b*b );

    return distance < threshold;
  }

  static mapClientCoordsToMouse(event: MouseEvent): Point {
    const bounds = event.currentTarget.getBoundingClientRect();

    const mouseX = event.clientX - bounds.left;
    const mouseY = event.clientY - bounds.top;
    return new Point(mouseX, mouseY);
  };
}

export default CanvasUtils;