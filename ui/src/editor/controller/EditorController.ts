import Element from "../../model/elements/Element";
import Model from "../../model/Model";
import { CanvasState } from "../../types";
import EditorView from "../view/EditorView";
import { ElementStates } from "../../constants/canvasConstants";

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
      elementUnderMouse.renderer.handleClick(canvasState);
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
      EditorView.viewState.activeElement.renderer.handleUnclick(canvasState);
    }

    EditorView.draw(ctx, canvasState);
  }

  handleMouseMove(ctx: CanvasRenderingContext2D, canvasState: CanvasState): void {
    if (EditorView.viewState.activeElement) {
      EditorView.viewState.activeElement.renderer.handleMouseMove(canvasState);
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