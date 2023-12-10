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

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    ctx.fillStyle = ACTION_IDLE_COLOUR;
    ctx.roundRect(this.pos.x, this.pos.y, this.width, this.height, 5);
    ctx.fill();

    ctx.font = DEFAULT_FONT;
    ctx.fillText(
      "HELLO!", 
      this.pos.x, 
      this.pos.y + this.height + 10
    );

    ctx.closePath();
  }
}

export default Action;