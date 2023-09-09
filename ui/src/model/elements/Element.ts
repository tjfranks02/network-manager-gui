import { ElementViewData } from "../../types";
import ElementRenderer from "../../editor/renderers/ElementViewManager";

class Element {
  id: string;
  viewData: ElementViewData;
  renderer!: ElementRenderer;

  constructor(id: string, viewData: ElementViewData) {
    this.id = id;
    this.viewData = viewData;
  }
}

export default Element;