import WorkflowElement from "./WorkflowElement";
import Point from "../../../../editor/utils/Point";

class Transition extends WorkflowElement {
  constructor(name: string, description: string, pos: Point, width: number, height: number) {
    super(name, description, pos, width, height);
  }
}

export default Transition;
