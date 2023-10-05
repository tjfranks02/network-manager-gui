import Element from "./Element";
import { ElementViewData } from "../../types";

class BlankCanvas extends Element {
  constructor(id: string, viewData: ElementViewData) {
    super(id, viewData);
  }
}

export default BlankCanvas;
