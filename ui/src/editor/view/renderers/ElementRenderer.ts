import Element from "../../model/elements/Element";

abstract class ElementRenderer {
  abstract elementUnderMouse(): Element | null;

  /**
   * Render the element in the editor
   */
  abstract draw(ctx: CanvasRenderingContext2D): void;

  /**
   * Event handlers
   */
  abstract handleClick(): void;
  abstract handleUnclick(): void;
  abstract handleMouseMove(): void;
}

export default ElementRenderer;