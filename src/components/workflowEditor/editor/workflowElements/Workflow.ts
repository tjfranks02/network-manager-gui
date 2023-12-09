import WorkflowElement from "./WorkflowElement";
import Point from "../../../../editor/utils/Point";

class Workflow extends WorkflowElement {
  steps: Array<WorkflowElement> = [];

  constructor() {
    // Workflows are not actually directly rendered, so we can just pass in dummy values
    super(new Point(0, 0), 0, 0);
  }
  
  draw(): void {
    throw new Error("Method not implemented.");
  }
}

export default Workflow;