class Point {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  applyScaleToPoint(scale: number): void {
    this.x *= scale;
    this.y *= scale;
  }

  movePoint(x: number, y: number): void {
    this.x += x;
    this.y += y;
  }
}

export default Point;