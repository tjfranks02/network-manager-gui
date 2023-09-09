import Point from "./editor/utils/Point"
import Element from "./editor/elements/Element"

export interface CanvasState {
  mousePos: Point,
};

export interface ViewState {
  lastClicked: Element | null,
  activeElement: Element | null,
  prevActiveElement: Element | null
}