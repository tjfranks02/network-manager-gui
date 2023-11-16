import ElementRenderer from "../../../editor/view/renderers/ElementRenderer";

class Element {
  id: string;
  renderer!: ElementRenderer;

  constructor(id: string) {
    this.id = id;
  }

  mapElementToTopology(): any {
    throw Error("Method should be implemented by child class");
  }
}

export default Element;