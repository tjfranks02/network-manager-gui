import Point from "./view/utils/Point"
import Element from "./view/elements/Element"

export interface CanvasState {
  mousePos: Point,
};

export interface ViewState {
  lastClicked: Element | null,
  activeElement: Element | null,
  prevActiveElement: Element | null
}