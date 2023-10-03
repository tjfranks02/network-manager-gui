import EditorModel from "../model/Model";
import { CanvasState } from "../types";
import Element from "../model/elements/Element";
import { ViewState } from "../types";
import store from "../../redux/store";
import { setActiveElement } from "../../redux/reducers/activeElement";
import { ElementStates, DEFAULT_ORIGIN } from "../editorConstants";

const DEFAULT_VIEW_STATE: ViewState = {
  lastClicked: null,
  activeElement: null,
  prevActiveElement: null,
  scale: 1,
  topLeftPos: DEFAULT_ORIGIN
};

/**
 * Wrapper class around view elements in the canvas
 */
class EditorView {
  viewState: ViewState;

  constructor() {
    this.viewState = DEFAULT_VIEW_STATE;
  }

  /**
   * After the user clicks the canvas, assign the active element as the element they clicked on.
   * 
   * Params:
   *   newActiveElem: Element | null - the element the user clicked on if any
   */
  assignNewActiveElement(newActiveElem: Element | null): void {
    this.viewState.lastClicked = newActiveElem;
    this.viewState.prevActiveElement = this.viewState.activeElement;
    this.viewState.activeElement = newActiveElem;
    store.dispatch(setActiveElement(newActiveElem ? newActiveElem.id : null));
  }

  /**
   * Get the element under the mouse with the highest z-index.
   * 
   * Params:
   *   canvasState: CanvasState - the current state of the editor canvas
   * 
   * Returns:
   *   Element | null - the element under the mouse with the highest z-index
   */
  getElementUnderMouse(canvasState: CanvasState): Element | null {
    let elementWithMaxZIndex: Element | null = null;

    for (let element of EditorModel.elements) {
      let elementUnderMouse: Element | null = element.renderer.elementUnderMouse(canvasState);
      
      if (!elementWithMaxZIndex) {
        elementWithMaxZIndex = elementUnderMouse;
      } else if (elementUnderMouse && 
          elementUnderMouse.viewData.zIndex > elementWithMaxZIndex.viewData.zIndex) {
        elementWithMaxZIndex = elementUnderMouse;
      }
    }

    return elementWithMaxZIndex;
  }

  getElementWithMaxZIndex() {

  }

  getElementsUnderMouse(canvasState: CanvasState): Array<Element> {
    let elementsUnderMouse: Array<Element> = [];
    
    for (let element of EditorModel.elements) {
      let elementUnderMouse: Element | null = element.renderer.elementUnderMouse(canvasState);

      if (elementUnderMouse) {
        elementsUnderMouse.push(elementUnderMouse);
      } 
    }

    return elementsUnderMouse;
  }

  draw(ctx: CanvasRenderingContext2D, canvasState: CanvasState): void {
    for (let element of EditorModel.elements) {
      element.renderer.draw(ctx, canvasState);
    }
  }

  resetElementStates() {
    EditorModel.elements.forEach((element) => element.viewData.state = ElementStates.IDLE);
  }

  panCanvas(canvasState: CanvasState, dx: number, dy: number) {
    this.viewState.topLeftPos.x += dx;
    this.viewState.topLeftPos.y += dy;
  }
}

const singletonInstance: EditorView = new EditorView();
Object.freeze(singletonInstance);

export default singletonInstance;