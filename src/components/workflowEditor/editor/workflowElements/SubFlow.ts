import WorkflowElement from "./WorkflowElement";
import Workflow from "./Workflow";
import Point from "../../../../editor/utils/Point";

class SubFlow extends WorkflowElement {
  workflow: Workflow;
  
  constructor(workflow: Workflow, pos: Point, width: number, height: number) {
    super(pos, width, height);
    this.workflow = workflow;
  }
};

export default SubFlow;