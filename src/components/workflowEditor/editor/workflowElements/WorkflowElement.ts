import Point from "../../../../editor/utils/Point";

class WorkflowElement {

  // Model properties
  name: string;
  description: string;

  // View properties
  pos: Point;
  width: number;
  height: number;

  constructor(name: string, description: string, pos: Point, width: number, height: number) {
    this.name = name;
    this.description = description;

    this.pos = pos;
    this.width = width;
    this.height = height;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    throw new Error("Method should be implemented by sub-class.");
  }
}

export default WorkflowElement;