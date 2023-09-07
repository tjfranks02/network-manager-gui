import Point from "../utils/Point";
import Node from "./elements/Node";
import Connection from "./elements/Connection";
import ConnectionPoint from "./elements/ConnectionPoint";
import { ElementStates } from "../constants/canvasConstants";
import Element from "./elements/Element";
import { CanvasState } from "../types";

/**
 * Wrapper class around view elements in the canvas
 */
class View {
  activeElement: Element | null;
  elements: Array<Element>;

  constructor() {
    this.activeElement= null;
    this.elements = [];
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

  handleCanvasEvent() {
    
  }

  /**
   * Handle the user clicking the canvas
   */
  handleMouseDown(ctx: CanvasRenderingContext2D | null, canvasState: CanvasState): Element | null {
    let elementUnderMouse = this.getElementAtMousePos(canvasState);

    this.resetElementStates();

    if (elementUnderMouse) {
      this.processElementClick(elementUnderMouse);
      return elementUnderMouse;
    }
    
    return null;
  }

  processElementClick(clickedElement: Element): void {
    clickedElement.state = ElementStates.CLICKED;

    switch (clickedElement.constructor) {
      case ConnectionPoint:
        this.processConnectionPointClick(<ConnectionPoint>clickedElement);
        break;
      case Node:
        this.processNodeClick(<Node>clickedElement);
        break;
    }

    this.activeElement = clickedElement;
  }

  /**
   * This function is called when a connection point associated with a node is clicked. Connection
   * points establish connections between nodes and so clicking one creates a connection.
   * 
   * Parameters:
   *   connectionPoint: The connection point that was clicked.
   */
  processConnectionPointClick(connectionPoint: ConnectionPoint): void {
    if (this.activeElement instanceof Connection && 
        this.activeElement.isIncomplete()) {
      this.activeElement.dest = connectionPoint.owner;
    } else {
      connectionPoint.owner.connections.push(new Connection(connectionPoint.owner));
    }
  }

  processNodeClick(node: Node): void {
    node.state = ElementStates.CLICKED;
  }

  handleMouseUp(ctx: CanvasRenderingContext2D, canvasState: CanvasState): void {
    if (this.activeElement) {
      this.processElementUnclick();
    }

    this.draw(ctx, canvasState);
  }

  processElementUnclick(activeElement: Element, canvasState: CanvasState): void {
    switch(activeElement.constructor) {
      case ConnectionPoint:
        handler
      break;
    }
  }

  handleMouseMove(ctx: CanvasRenderingContext2D, canvasState: CanvasState): void {
    if (this.activeElement) {
      this.processElementMove(ctx, canvasState);
    }

    this.draw(ctx, canvasState);
  }

  processElementMove(ctx: CanvasRenderingContext2D, canvasState: CanvasState): void {
    switch (this.activeElement!.constructor) {
      case ConnectionPoint:
        // this.processConnectionPointMove(clickedElement);
        break;
      case Node:
        this.processNodeMove(<Node>this.activeElement, ctx, canvasState);
        break;
    }
  }

  processNodeMove(activeNode: Node, ctx: CanvasRenderingContext2D, canvasState: CanvasState): void {
    // Need a function that will move to the position of the mouse
    activeNode.pos = canvasState.mousePos;
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