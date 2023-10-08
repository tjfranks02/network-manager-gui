import EditorModel from "../model/Model";
import Element from "../model/elements/Element";
import { ViewState, ViewStates } from "../types";
import store from "../../redux/store";
import { setActiveElement } from "../../redux/reducers/activeElement";
import { 
  ElementStates, 
  DEFAULT_ORIGIN, 
  DEFAULT_CANVAS_WIDTH, 
  DEFAULT_CANVAS_HEIGHT 
} from "../editorConstants";
import Point from "../utils/Point";

const DEFAULT_VIEW_STATE: ViewState = {
  lastClicked: null,
  activeElement: null,
  prevActiveElement: null,
  scale: 1,
  panVector: DEFAULT_ORIGIN,
  mousePos: DEFAULT_ORIGIN,
  oldMousePos: DEFAULT_ORIGIN,
  canvasSize: { width: DEFAULT_CANVAS_WIDTH, height: DEFAULT_CANVAS_HEIGHT },
  state: ViewStates.IDLE
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
   * Returns:
   *   Element | null - the element under the mouse with the highest z-index
   */
  getElementUnderMouse(): Element | null {
    let elementWithMaxZIndex: Element | null = null;

    for (let element of EditorModel.elements) {
      let elementUnderMouse: Element | null = element.renderer.elementUnderMouse();
      
      if (!elementWithMaxZIndex) {
        elementWithMaxZIndex = elementUnderMouse;
      } else if (elementUnderMouse && 
          elementUnderMouse.renderer.zIndex > elementWithMaxZIndex.renderer.zIndex) {
        elementWithMaxZIndex = elementUnderMouse;
      }
    }

    return elementWithMaxZIndex;
  }

  getElementsUnderMouse(): Array<Element> {
    let elementsUnderMouse: Array<Element> = [];
    
    for (let element of EditorModel.elements) {
      let elementUnderMouse: Element | null = element.renderer.elementUnderMouse();

      if (elementUnderMouse) {
        elementsUnderMouse.push(elementUnderMouse);
      } 
    }

    return elementsUnderMouse;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    for (let element of EditorModel.elements) {
      element.renderer.draw(ctx);
    }
  }

  resetElementStates() {
    EditorModel.elements.forEach((element) => element.renderer.state = ElementStates.IDLE);
  }

  panCanvas() {
    let deltaX: number = this.viewState.mousePos.x - this.viewState.oldMousePos.x;
    let deltaY: number = this.viewState.mousePos.y - this.viewState.oldMousePos.y;

    this.viewState.panVector.x += deltaX;
    this.viewState.panVector.y += deltaY;

    for (let element of EditorModel.elements) {
      element.renderer.updateViewPos();
    }
  }

  mapViewPosToCanvasPos(point: Point): Point {
    let mappedPoint: Point = new Point(0, 0);

    mappedPoint.x = point.x + this.viewState.panVector.x;
    mappedPoint.y = point.y + this.viewState.panVector.y;

    return mappedPoint;
  }
}

const singletonInstance: EditorView = new EditorView();
Object.freeze(singletonInstance);

export default singletonInstance;