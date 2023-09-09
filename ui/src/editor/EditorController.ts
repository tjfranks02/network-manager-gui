import Element from "../model/elements/Element";
import Model from "../model/Model";
import { CanvasState, ViewState } from "../types";
import CanvasClickEventHandler from "./eventHandlers/CanvasClickEventHandler";
import CanvasMouseMoveEventHandler from "./eventHandlers/CanvasMouseMoveEventHandler";
import CanvasUnclickEventHandler from "./eventHandlers/CanvasUnclickEventHandler";
import EditorView from "./EditorView";
import { ElementStates } from "../constants/canvasConstants";

// Redux
import store from "../redux/store";
import { setActiveElement } from "../redux/reducers/activeElement";

/**
 * Wrapper class around view elements in the canvas
 */
class EditorController {

  constructor() {
  }
  
  /**
   * Handle the user clicking the canvas
   */
  handleMouseDown(ctx: CanvasRenderingContext2D, canvasState: CanvasState): Element | null {
    let elementUnderMouse = EditorView.getElementUnderMouse(canvasState);
    this.resetElementStates();

    if (elementUnderMouse) {
      EditorView.assignNewActiveElement(elementUnderMouse);
      // CanvasClickEventHandler.handle(canvasState);
    }

    EditorView.draw(ctx, canvasState);
    return elementUnderMouse;
  }

  resetElementStates() {
    for (let element of Model.elements) {
      element.viewData.state = ElementStates.IDLE;
    }
  }

  handleMouseUp(ctx: CanvasRenderingContext2D, canvasState: CanvasState): void {
    if (EditorView.viewState.activeElement) {
      CanvasUnclickEventHandler.handle(canvasState);
    }

    EditorView.draw(ctx, canvasState);
  }

  handleMouseMove(ctx: CanvasRenderingContext2D, canvasState: CanvasState): void {
    if (EditorView.viewState.activeElement) {
      CanvasMouseMoveEventHandler.handle(canvasState);
    }

    EditorView.draw(ctx, canvasState);
  }

  /**
   * Construct the view of the network from a previously-saved specification.
   */
  constructViewFromSpec(): EditorController {
    return new EditorController();
  }
}

const singletonInstance: EditorController = new EditorController();
Object.freeze(singletonInstance);

export default singletonInstance;