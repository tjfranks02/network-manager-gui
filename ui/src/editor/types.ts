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
  /**
   * There is no active element in the canvas
   */
  IDLE = "IDLE",

  /**
   * A blank canvas has been clicked and the mouse is still down
   */
  CANVAS_FOCUSSED = "CANVAS_FOCUSSED",

  /**
   * An element has been clicked and the mouse is still down
   */
  ELEMENT_FOCUSSED = "ELEMENT_FOCUSSED",

  /**
   * An element has been clicked and the mouse has been released. The element is now active
   */
  ELEMENT_ACTIVE = "ELEMENT_ACTIVE"
};

export interface ElementViewData {
  pos: Point,
  state: ElementStates,
  zIndex: number,
  margin: number,
  padding: number,
  [key: string]: any
};