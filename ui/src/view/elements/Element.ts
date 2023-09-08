import { ElementStates } from "../../constants/canvasConstants";
import Point from "../utils/Point";
import { CanvasState } from "../../types";

interface Drawable {
  draw(ctx: CanvasRenderingContext2D, canvasState: CanvasState): void
}

class Element implements Drawable {
  id: string;
  pos: Point;
  state: ElementStates;

  constructor(id: string, pos: Point, state = ElementStates.IDLE) {
    this.pos = pos;
    this.id = id;
    this.state = state;
  }

  resetState(): void {
    this.state = ElementStates.IDLE;
  }

  getElementAtMousePos(canvasState: CanvasState): Element | null {
    return new Element("test", new Point(1, 2));
  }

  draw(ctx: CanvasRenderingContext2D, canvasState: CanvasState): void {
    console.log("Should be implemented by subclass!");
  }
}

export default Element;