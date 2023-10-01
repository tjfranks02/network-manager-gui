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

// Constants
import { MIN_SCALE, MAX_SCALE, SCALE_DELTA } from "../editorConstants";

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
    let elementUnderMouse: Element | null = EditorView.getElementUnderMouse(canvasState);   
    let activeElement: Element | null = EditorView.viewState.activeElement;

    // Add active Node to NodeGroup
    if (activeElement instanceof Node && elementUnderMouse instanceof NodeGroup) {
      elementUnderMouse.addNode(activeElement);
      EditorModel.removeElementById(activeElement.id);
    }
    
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

  handleMouseWheelScroll(deltaY: number) {
    if (deltaY < 0) { // Up
      EditorView.viewState.scale = Math.max(EditorView.viewState.scale - SCALE_DELTA, MIN_SCALE);
    } else { // Down
      EditorView.viewState.scale = Math.min(EditorView.viewState.scale + SCALE_DELTA, MAX_SCALE);
    }
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
        newElement = new Node(id, { pos: canvasState.mousePos, state: ElementStates.IDLE, zIndex: 1, margin: 12, padding: 0 });
        break;

      case NodeGroup.name:
        newElement = new NodeGroup(id, { pos: canvasState.mousePos, state: ElementStates.IDLE, zIndex: 2, margin: 0, padding: 8 });
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