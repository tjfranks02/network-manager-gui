import { CanvasState } from "../../types";
import Element from "../../model/elements/Element";

abstract class ElementViewManager {
  abstract elementUnderMouse(canvasState: CanvasState): Element | null;

  abstract draw(ctx: CanvasRenderingContext2D, canvasState: CanvasState): void;
}

export default ElementViewManager;