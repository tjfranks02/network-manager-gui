import Point from "../../../../editor/utils/Point";

class WorkflowElement {
  pos: Point;

  // View properties
  width: number;
  height: number;

  constructor(pos: Point, width: number, height: number) {
    this.pos = pos;
    this.width = width;
    this.height = height;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    throw new Error("Method should be implemented by sub-class.");
  }
}

export default WorkflowElement;