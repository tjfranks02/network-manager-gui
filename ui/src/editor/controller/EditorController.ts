import Element from "../model/elements/Element";
import EditorModel from "../model/Model";
import { ViewStates } from "../types";
import EditorView from "../view/EditorView";
import { ElementStates } from "../../constants/editorConstants";
import ModelUtils from "../model/utils/modelUtils";
import NodeGroupRenderer from "../view/renderers/NodeGroupRenderer";

// Elements
import Node from "../model/elements/Node";
import NodeGroup from "../model/elements/NodeGroup";

/**
 * Wrapper class around view elements in the canvas
 */
class EditorController {

  constructor() {
  }

  handleLeftClick(ctx: CanvasRenderingContext2D): void {
    let elementUnderMouse = EditorView.getElementUnderMouse();
    this.resetElementStates();

    EditorView.assignNewActiveElement(elementUnderMouse);

    if (elementUnderMouse) {
      EditorView.viewState.state = ViewStates.ELEMENT_FOCUSSED;
      elementUnderMouse.renderer.handleClick();
    } 
    
    EditorView.draw(ctx);
  }

  handleMiddleMouseClick(ctx: CanvasRenderingContext2D): void {
    EditorView.viewState.state = ViewStates.CANVAS_FOCUSSED;
    EditorView.draw(ctx);
  }

  handleRightClick(ctx: CanvasRenderingContext2D): void {
    EditorView.draw(ctx);
  }

  resetElementStates() {
    for (let element of EditorModel.elements) {
      element.renderer.state = ElementStates.IDLE;
    }
  }

  handleMiddleMouseUp(ctx: CanvasRenderingContext2D): void {
    EditorView.viewState.state = ViewStates.IDLE;
    EditorView.draw(ctx);
  }

  handleLeftMouseUp(ctx: CanvasRenderingContext2D): void {
    let elementUnderMouse: Element | null = EditorView.getElementUnderMouse();   
    let activeElement: Element | null = EditorView.viewState.activeElement;

    // Add active Node to NodeGroup
    if (activeElement instanceof Node && elementUnderMouse instanceof NodeGroup) {
      (<NodeGroupRenderer>elementUnderMouse.renderer).addNodeToGroup(activeElement);
      EditorModel.removeElementById(activeElement.id);
    }
    
    if (EditorView.viewState.activeElement) {
      EditorView.viewState.activeElement.renderer.handleUnclick();
    }

    switch (EditorView.viewState.state) {
      case ViewStates.CANVAS_FOCUSSED:
        EditorView.viewState.state = ViewStates.IDLE;
        break;
      
      case ViewStates.ELEMENT_FOCUSSED:
        EditorView.viewState.state = ViewStates.ELEMENT_ACTIVE;
        break;
    }

    EditorView.draw(ctx);
  }

  handleMouseMove(ctx: CanvasRenderingContext2D): void {
    switch (EditorView.viewState.state) {
      case ViewStates.CANVAS_FOCUSSED:
        EditorView.panCanvas(
          EditorView.viewState.mousePos.x - EditorView.viewState.oldMousePos.x,
          EditorView.viewState.mousePos.y - EditorView.viewState.oldMousePos.y
        );
        break;
      
      case ViewStates.ELEMENT_FOCUSSED:
        EditorView.viewState.activeElement!.renderer.handleMouseMove(
          EditorView.mapViewPosToWorldPos(EditorView.viewState.mousePos)
        );
        break;
      
      default:
        break;
    }
 
    EditorView.draw(ctx);
  }

  handleMouseWheelScroll(ctx: CanvasRenderingContext2D, deltaY: number) {
    EditorView.scaleCanvas(ctx, deltaY);    
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
          pos: EditorView.mapViewPosToWorldPos(EditorView.viewState.mousePos),
          state: ElementStates.IDLE, 
          zIndex: 1, 
          margin: 12, 
          padding: 0
        });
        break;

      case NodeGroup.name:
        newElement = new NodeGroup(id, { 
          pos: EditorView.mapViewPosToWorldPos(EditorView.viewState.mousePos),
          state: ElementStates.IDLE, 
          zIndex: 2, 
          margin: 0, 
          padding: 8
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