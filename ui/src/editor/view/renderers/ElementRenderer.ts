import { CanvasState } from "../../../types";
import Element from "../../../model/elements/Element";

abstract class ElementRenderer {
  abstract elementUnderMouse(canvasState: CanvasState): Element | null;

  /**
   * Render the element in the editor
   */
  abstract draw(ctx: CanvasRenderingContext2D, canvasState: CanvasState): void;

  /**
   * Event handlers
   */
  abstract handleClick(canvasState: CanvasState): void;
  abstract handleUnclick(canvasState: CanvasState): void;
  abstract handleMouseMove(canvasState: CanvasState): void;
}

export default ElementRenderer;