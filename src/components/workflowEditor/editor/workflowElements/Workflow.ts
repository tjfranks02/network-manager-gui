import WorkflowElement from "./WorkflowElement";
import Point from "../../../../editor/utils/Point";

class Workflow extends WorkflowElement {
  steps: Array<WorkflowElement> = [];

  constructor() {
    // Workflows are not actually directly rendered, so we can just pass in dummy values
    super(new Point(0, 0), 0, 0);
  }
  
  draw(ctx: CanvasRenderingContext2D): void {
    for (let step of this.steps) {
      step.draw(ctx);
    }
  }
}

export default Workflow;