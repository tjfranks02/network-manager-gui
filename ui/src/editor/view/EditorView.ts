import EditorModel from "../model/Model";
import Element from "../model/elements/Element";
import { ViewState, ViewStates } from "../types";
import store from "../../redux/store";
import { setActiveElement } from "../../redux/reducers/activeElement";
import { 
  ElementStates, 
  DEFAULT_ORIGIN, 
  DEFAULT_CANVAS_WIDTH, 
  DEFAULT_CANVAS_HEIGHT,
  SCALE_DELTA,
  MIN_SCALE,
  MAX_SCALE
} from "../../constants/editorConstants";
import Point from "../utils/Point";

const DEFAULT_VIEW_STATE: ViewState = {
  lastClicked: null,
  activeElement: null,
  prevActiveElement: null,
  scale: 1,
  scaleOffset: DEFAULT_ORIGIN,
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
      let elementUnderMouse: Element | null = element.renderer.elementUnderMouse(
        this.mapViewPosToWorldPos(this.viewState.mousePos)
      );
      
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
      let elementUnderMouse: Element | null = element.renderer.elementUnderMouse(
        this.mapViewPosToWorldPos(this.viewState.mousePos)
      );

      if (elementUnderMouse) {
        elementsUnderMouse.push(elementUnderMouse);
      } 
    }

    return elementsUnderMouse;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.translate(this.viewState.panVector.x + this.viewState.scaleOffset.x, this.viewState.panVector.y + this.viewState.scaleOffset.y);
    ctx.scale(this.viewState.scale, this.viewState.scale);

    for (let element of EditorModel.elements) {
      element.renderer.draw(ctx);
    }

    ctx.setTransform(1, 0, 0, 1, 0, 0);
  }

  resetElementStates() {
    EditorModel.elements.forEach((element) => element.renderer.state = ElementStates.IDLE);
  }

  panCanvas(deltaX: number, deltaY: number) {
    this.viewState.panVector.x += deltaX;
    this.viewState.panVector.y += deltaY;
  }

  mapViewPosToWorldPos(point: Point): Point {
    let mappedPoint = new Point(point.x, point.y);

    mappedPoint.x -= this.viewState.panVector.x;
    mappedPoint.y -= this.viewState.panVector.y;

    mappedPoint.x /= this.viewState.scale;
    mappedPoint.y /= this.viewState.scale;

    return mappedPoint;
  }

  /**
   * Apply scale value to a given number. Useful for scaling dimensions of elements
   * 
   * Params:
   *   val: number - the value to scale
   * 
   * Returns:
   *   number - the scaled value
   */
  scaleValue(val: number): number {
    return val * this.viewState.scale;
  }

  scaleCanvas(ctx: CanvasRenderingContext2D, deltaY: number) {
    if (deltaY > 0) { // Down, zoom in
      this.viewState.scale = Math.max(this.viewState.scale - SCALE_DELTA, MIN_SCALE);
    } else { // Up, zoom out
      this.viewState.scale = Math.min(this.viewState.scale + SCALE_DELTA, MAX_SCALE);
    }

    let mousePosAfterScale: Point = this.viewState.mousePos.applyScaleToPoint(this.viewState.scale);
    console.log("-----------------------------")
    console.log("scale:", this.viewState.scale);
    console.log("mousePos:", this.viewState.mousePos.x, this.viewState.mousePos.y);
    console.log("mousePosAfterScale:", mousePosAfterScale.x, mousePosAfterScale.y);
    console.log("diff:", this.viewState.mousePos.x - mousePosAfterScale.x, this.viewState.mousePos.y - mousePosAfterScale.y);
    console.log("pan:", this.viewState.panVector.x, this.viewState.panVector.y);

    // Amount we need to pan the canvas by in total
    let dx: number = (this.viewState.mousePos.x - mousePosAfterScale.x);
    let dy: number = (this.viewState.mousePos.y - mousePosAfterScale.y);

    this.viewState.scaleOffset = new Point(dx, dy);
    this.draw(ctx);
  }
}

const singletonInstance: EditorView = new EditorView();
Object.freeze(singletonInstance);

export default singletonInstance;