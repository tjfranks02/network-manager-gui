import Model from "../model/Model";
import { CanvasState } from "../types";
import Element from "../model/elements/Element";
import { ViewState } from "../types";
import store from "../../redux/store";
import { setActiveElement } from "../../redux/reducers/activeElement";
import { ElementStates } from "../editorConstants";

/**
 * Wrapper class around view elements in the canvas
 */
class EditorView {
  viewState!: ViewState;

  constructor() {
    this.viewState = { lastClicked: null, activeElement: null, prevActiveElement: null };
  }

  assignNewActiveElement(newActiveElem: Element) {
    this.viewState.lastClicked = newActiveElem;
    this.viewState.prevActiveElement = this.viewState.activeElement;
    this.viewState.activeElement = newActiveElem;
    store.dispatch(setActiveElement(newActiveElem.id));
  }

  getElementUnderMouse(canvasState: CanvasState): Element | null {
    for (let element of Model.elements) {
      let elementUnderMouse: Element | null = element.renderer.elementUnderMouse(canvasState);
      
      if (elementUnderMouse) {
        return elementUnderMouse;
      }
    }
    return null;
  }

  draw(ctx: CanvasRenderingContext2D, canvasState: CanvasState): void {
    for (let element of Model.elements) {
      element.renderer.draw(ctx, canvasState);
    }
  }

  resetElementStates() {
    Model.elements.forEach((element) => element.viewData.state = ElementStates.IDLE);
  }
}

const singletonInstance: EditorView = new EditorView();
Object.freeze(singletonInstance);

export default singletonInstance;