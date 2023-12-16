import WorkflowElement from "./WorkflowElement";
import Point from "../../../../editor/utils/Point";

import {
  ACTION_IDLE_COLOUR,
  DEFAULT_FONT
} from "../../../../constants/workflowEditorConstants";

class Action extends WorkflowElement {
  constructor(name: string, description: string, pos: Point, width: number, height: number) {
    super(name, description, pos, width, height);
  }

  elementUnderMouse(mousePos: Point): WorkflowElement | null {
    if (this.isMouseOverElement(mousePos)) {
      return this;
    }

    return null;
  }

  isMouseOverElement(mousePos : Point): boolean {
    let mouseX = mousePos.x;
    let mouseY = mousePos.y; 
    let bbTopLeftX = this.pos.x;
    let bbTopLeftY = this.pos.y;
    let bbBottomRightX = this.pos.x + this.width;
    let bbBottomRightY = this.pos.y + this.height;

    if (bbTopLeftX <= mouseX && mouseX <= bbBottomRightX
        && bbTopLeftY <= mouseY && mouseY <= bbBottomRightY) {
      return true;
    }

    return false;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    ctx.fillStyle = ACTION_IDLE_COLOUR;
    ctx.roundRect(this.pos.x, this.pos.y, this.width, this.height, 5);
    ctx.fill();

    ctx.font = DEFAULT_FONT;
    ctx.fillText(
      this.name, 
      this.pos.x, 
      this.pos.y + this.height + 12
    );

    ctx.closePath();
  }
}

export default Action;