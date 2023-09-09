import Point from "./model/utils/Point";
import Element from "./model/elements/Element";
import { ElementStates } from "./constants/canvasConstants";

export interface CanvasState {
  mousePos: Point,
};

export interface ViewState {
  lastClicked: Element | null,
  activeElement: Element | null,
  prevActiveElement: Element | null
}

export interface ElementViewData {
  pos: Point,
  state: ElementStates,
}