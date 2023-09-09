import Point from "./Point";

class CanvasUtils {
  static isMouseInRangeOfPoint(mousePoint: Point, targetPoint: Point, threshold: number): boolean {
    // Calculate Euclidean distance between points
    let a = Math.abs(mousePoint.x - targetPoint.x);
    let b = Math.abs(mousePoint.y - targetPoint.y);
    let distance = Math.sqrt( a*a + b*b );

    return distance < threshold;
  }
}

export default CanvasUtils;