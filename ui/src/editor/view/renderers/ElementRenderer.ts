import { ElementStates } from "../../editorConstants";
import Element from "../../model/elements/Element";
import { BaseElementViewData } from "../../types";
import Point from "../../utils/Point";

abstract class ElementRenderer {
  worldPos: Point;
  viewPos: Point;
  state: ElementStates;
  zIndex: number;
  margin: number;
  padding: number;

  constructor(baseViewData: BaseElementViewData) {
    this.worldPos = baseViewData.worldPos;
    this.viewPos = baseViewData.viewPos;
    this.state = baseViewData.state;
    this.zIndex = baseViewData.zIndex;
    this.margin = baseViewData.margin;
    this.padding = baseViewData.padding;
  }

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

  /**
   * When some change is made to the viewport, update the view position of the element
   */
  abstract updateViewPos(): void;
}

export default ElementRenderer;