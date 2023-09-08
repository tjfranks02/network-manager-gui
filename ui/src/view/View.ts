import Point from "./utils/Point";
import Node from "./elements/Node/Node";
import Element from "./elements/Element";
import { CanvasState, ViewState } from "../types";
import CanvasClickEventHandler from "./eventHandlers/CanvasClickEventHandler";
import CanvasMouseMoveEventHandler from "./eventHandlers/CanvasMouseMoveEventHandler";
import CanvasUnclickEventHandler from "./eventHandlers/CanvasUnclickEventHandler";

/**
 * Wrapper class around view elements in the canvas
 */
class View {
  elements: Array<Element>;
  viewState: ViewState;

  constructor() {
    this.elements = [];
    this.viewState = { lastClicked: null, activeElement: null, prevActiveElement: null }
    this.constructElements();
  }

  /**
   * Constructs a series of elements for testing purposes.
   */
  constructElements(): void {
    this.elements.push(new Node("my node", new Point(50, 100)));
    this.elements.push(new Node("my 2nd node", new Point(500, 100)));
    this.elements.push(new Node("my 3rd node", new Point(750, 200)));
  }

  /**
   * Gets the element underneath the current mouse position if there is one.
   * 
   * Params:
   *   canvasState ({}): The current state of the canvas. Includes mousePos var
   * 
   * Returns:
   *   The element (with highest priority) under the current mouse position.
   *   null if there isn't currently any element under the mouse 
   */
  getElementAtMousePos(canvasState: CanvasState): Element | null {
    // We need to know whether we clicked anything or not
    for (let element of this.elements) {
      let clickedElement = element.getElementAtMousePos(canvasState);

      if (clickedElement) {
        return clickedElement;
      }
    }

    return null;
  }

  resetElementStates(): void {
    for (let element of this.elements) {
      element.resetState();
    }
  }

  /**
   * Handle the user clicking the canvas
   */
  handleMouseDown(ctx: CanvasRenderingContext2D, canvasState: CanvasState): Element | null {
    let elementUnderMouse = this.getElementAtMousePos(canvasState);
    this.viewState.lastClicked = elementUnderMouse;
    this.viewState.prevActiveElement = this.viewState.activeElement;
    this.viewState.activeElement = elementUnderMouse;
    this.resetElementStates();

    if (elementUnderMouse) {
      CanvasClickEventHandler.handle(this, canvasState);
    }

    this.draw(ctx, canvasState);
    return elementUnderMouse;
  }

  handleMouseUp(ctx: CanvasRenderingContext2D, canvasState: CanvasState): void {
    if (this.viewState.activeElement) {
      CanvasUnclickEventHandler.handle(this, canvasState);
    }

    this.draw(ctx, canvasState);
  }

  handleMouseMove(ctx: CanvasRenderingContext2D, canvasState: CanvasState): void {
    if (this.viewState.activeElement) {
      CanvasMouseMoveEventHandler.handle(this, canvasState);
    }

    this.draw(ctx, canvasState);
  }

  draw(ctx: CanvasRenderingContext2D, canvasState: CanvasState): void {
    for (let element of this.elements) {
      element.draw(ctx, canvasState);
    }
  }

  /**
   * Construct the view of the network from a previously-saved specification.
   */
  constructViewFromSpec(): View {
    return new View();
  }
}

export default View;