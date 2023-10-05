import Point from "./utils/Point";
import Element from "./model/elements/Element";
import { ElementStates } from "./editorConstants";

export interface ViewState {
  lastClicked: Element | null,
  activeElement: Element | null,
  prevActiveElement: Element | null,
  scale: number,
  panVector: Point,
  mousePos: Point,
  oldMousePos: Point,
  canvasSize: { width: number, height: number },
  state: ViewStates
};

export enum ViewStates {
  IDLE = "IDLE",
  PANNING = "PANNING"
};

export interface ElementViewData {
  pos: Point,
  state: ElementStates,
  zIndex: number,
  margin: number,
  padding: number,
  [key: string]: any
};