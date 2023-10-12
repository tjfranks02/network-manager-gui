import { ElementStates } from "../../editorConstants";
import Element from "../../model/elements/Element";
import { BaseElementViewData } from "../../types";
import Point from "../../utils/Point";

abstract class ElementRenderer {
  pos: Point;
  state: ElementStates;
  zIndex: number;
  margin: number;
  padding: number;

  constructor(baseViewData: BaseElementViewData) {
    this.pos = baseViewData.pos;
    this.state = baseViewData.state;
    this.zIndex = baseViewData.zIndex;
    this.margin = baseViewData.margin;
    this.padding = baseViewData.padding;
  }

  abstract elementUnderMouse(mousePos: Point): Element | null;

  /**
   * Render the element in the editor
   */
  abstract draw(ctx: CanvasRenderingContext2D): void;

  /**
   * Event handlers
   */
  abstract handleClick(): void;
  abstract handleUnclick(): void;
  abstract handleMouseMove(mousePos: Point): void;
}

export default ElementRenderer;