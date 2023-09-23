import Element from "../../model/elements/Element";
import Model from "../../model/Model";
import { CanvasState } from "../../types";
import EditorView from "../view/EditorView";
import { ElementStates } from "../../constants/canvasConstants";

// Event handlers
import CanvasClickEventHandler from "./eventHandlers/CanvasClickEventHandler";
import CanvasUnclickEventHandler from "./eventHandlers/CanvasUnclickEventHandler";
import CanvasMouseMoveEventHandler from "./eventHandlers/CanvasMouseMoveEventHandler";

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
      CanvasClickEventHandler.handle(canvasState);
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

  async createElement(elementClassName: string): Promise<void> {
    EditorView.createElement(elementClassName);
  }
}

const singletonInstance: EditorController = new EditorController();
Object.freeze(singletonInstance);

export default singletonInstance;