import ElementRenderer from "../../../editor/view/renderers/ElementRenderer";

class Element {
  id: string;
  renderer!: ElementRenderer;

  constructor(id: string) {
    this.id = id;
  }
}

export default Element;