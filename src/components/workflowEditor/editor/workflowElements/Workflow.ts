import WorkflowElement from "./WorkflowElement";
import Point from "../../../../editor/utils/Point";

class Workflow extends WorkflowElement {
  /**
   * The name of the workflow e.g. "Deploy Nginx server"
   */
  name: string;

  /**
   * Description of what this workflow does
   */
  description: string;


  steps: Array<WorkflowElement> = [];

  constructor(name: string, description: string) {
    // Workflows are not actually directly rendered, so we can just pass in dummy values
    super(name, description, new Point(0, 0), 0, 0);

    this.name = name;
    this.description = description;
    this.steps = [];
  }

  elementUnderMouse(mousePos: Point): WorkflowElement | null {
    for (let step of this.steps) {
      let subElement = step.elementUnderMouse(mousePos);

      if (subElement) {
        return subElement;
      }
    }

    return null;
  }

  addStep(step: WorkflowElement): void {
    this.steps.push(step);
  }
  
  draw(ctx: CanvasRenderingContext2D): void {
    for (let step of this.steps) {
      step.draw(ctx);
    }
  }
}

export default Workflow;