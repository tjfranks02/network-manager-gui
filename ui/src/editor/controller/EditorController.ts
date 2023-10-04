import Element from "../model/elements/Element";
import EditorModel from "../model/Model";
import {  } from "../types";
import EditorView from "../view/EditorView";
import { ElementStates } from "../editorConstants";
import ModelUtils from "../model/utils/modelUtils";

// Elements
import Node from "../model/elements/Node";
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
   * Handle the user clicking the canvas.
   * 
   * Params:
   *   ctx: CanvasRenderingContext2D - the canvas context
   */
  handleMouseDown(ctx: CanvasRenderingContext2D): void {
    let elementUnderMouse = EditorView.getElementUnderMouse();
    this.resetElementStates();

    EditorView.assignNewActiveElement(elementUnderMouse);

    if (elementUnderMouse) {
      elementUnderMouse.renderer.handleClick();
    }

    EditorView.draw(ctx);
  }

  resetElementStates() {
    for (let element of EditorModel.elements) {
      element.viewData.state = ElementStates.IDLE;
    }
  }

  handleMouseUp(ctx: CanvasRenderingContext2D): void {
    let elementUnderMouse: Element | null = EditorView.getElementUnderMouse();   
    let activeElement: Element | null = EditorView.viewState.activeElement;

    // Add active Node to NodeGroup
    if (activeElement instanceof Node && elementUnderMouse instanceof NodeGroup) {
      elementUnderMouse.addNode(activeElement);
      EditorModel.removeElementById(activeElement.id);
    }
    
    if (EditorView.viewState.activeElement) {
      EditorView.viewState.activeElement.renderer.handleUnclick();
    }

    EditorView.draw(ctx);
  }

  handleMouseMove(ctx: CanvasRenderingContext2D): void {
    if (EditorView.viewState.activeElement) {
      EditorView.viewState.activeElement.renderer.handleMouseMove();
    } else if (EditorView.viewState.prevActiveElement) {
      // No active element selected, pan the canvas
      EditorView.panCanvas();
    }

    EditorView.draw(ctx);
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

  createElement(elementClassName: string): void {
    let newElement: Element | null = null;
    let id: string = ModelUtils.generateUUID();

    switch (elementClassName) {
      case Node.name:
        newElement = new Node(id, { 
          pos: EditorView.viewState.mousePos,
          state: ElementStates.IDLE, 
          zIndex: 1, 
          margin: 12, 
          padding: 0,
          canvasPos: EditorView.viewState.mousePos
        });
        break;

      case NodeGroup.name:
        newElement = new NodeGroup(id, { 
          pos: EditorView.viewState.mousePos,
          state: ElementStates.IDLE, 
          zIndex: 2, 
          margin: 0, 
          padding: 8,
          canvasPos: EditorView.viewState.mousePos 
        });
        break;
    }

    if (newElement) {
      EditorModel.elements.push(newElement);
    }
  }

  draw(ctx: CanvasRenderingContext2D): void {
    EditorView.draw(ctx);
  }
}

const singletonInstance: EditorController = new EditorController();
Object.freeze(singletonInstance);

export default singletonInstance;