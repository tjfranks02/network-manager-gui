import Point from "./utils/Point";
import Element from "./model/elements/Element";
import { ElementStates } from "./editorConstants";

export interface CanvasState {
  mousePos: Point,
};

export interface ViewState {
  lastClicked: Element | null,
  activeElement: Element | null,
  prevActiveElement: Element | null,
  scale: number;
}

export interface ElementViewData {
  pos: Point,
  state: ElementStates,
  zIndex: number,
  margin: number,
  padding: number,
  [key: string]: any
}