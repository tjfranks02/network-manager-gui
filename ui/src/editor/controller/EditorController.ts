import Element from "../model/elements/Element";
import EditorModel from "../model/Model";
import { CanvasState } from "../types";
import EditorView from "../view/EditorView";
import { ElementStates } from "../editorConstants";
import ModelUtils from "../model/utils/modelUtils";

// Elements
import Node from "../model/elements/Node";
import Connection from "../model/elements/Connection";
import NodeGroup from "../model/elements/NodeGroup";

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
    for (let element of EditorModel.elements) {
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

  createElement(elementClassName: string, canvasState: CanvasState): void {
    let newElement: Element | null = null;
    let id: string = ModelUtils.generateUUID();

    switch (elementClassName) {
      case Node.name:
        newElement = new Node(id, { pos: canvasState.mousePos, state: ElementStates.IDLE });
        break;

      case NodeGroup.name:
        newElement = new NodeGroup(id, { pos: canvasState.mousePos, state: ElementStates.IDLE });
    }

    if (newElement) {
      EditorModel.elements.push(newElement);
    }
  }

  draw(ctx: CanvasRenderingContext2D, canvasState: CanvasState): void {
    EditorView.draw(ctx, canvasState);
  }
}

const singletonInstance: EditorController = new EditorController();
Object.freeze(singletonInstance);

export default singletonInstance;