import Point from "./utils/Point";
import Element from "./model/elements/Element";
import { ElementStates } from "./editorConstants";

export interface CanvasState {
  mousePos: Point,
  oldMousePos: Point | null
};

export interface ViewState {
  lastClicked: Element | null,
  activeElement: Element | null,
  prevActiveElement: Element | null,
  scale: number,
  topLeftPos: Point,
  mousePos: Point,
  oldMousePos: Point
};

export interface ElementViewData {
  pos: Point,
  state: ElementStates,
  zIndex: number,
  margin: number,
  padding: number,
  [key: string]: any
};