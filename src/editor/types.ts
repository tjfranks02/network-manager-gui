import Point from "./utils/Point";
import Element from "./model/elements/Element";
import { ElementStates } from "../constants/editorConstants";

export interface ViewState {
  lastClicked: Element | null,
  activeElement: Element | null,
  prevActiveElement: Element | null,
  scale: number,
  scaleOffset: Point,
  panVector: Point,
  mousePos: Point,
  oldMousePos: Point,
  canvasSize: { width: number, height: number },
  state: ViewStates
};

/**
 * Various states that an element in the editor can be in
 */
export enum ViewStates {
  // There is no active element in the canvas
  IDLE = "IDLE",

  // A blank canvas has been clicked and the mouse is still down
  CANVAS_FOCUSSED = "CANVAS_FOCUSSED",

  // An element has been clicked and the mouse is still down
  ELEMENT_FOCUSSED = "ELEMENT_FOCUSSED",

  // An element has been clicked and the mouse has been released. The element is now active
  ELEMENT_ACTIVE = "ELEMENT_ACTIVE"
};

/**
 * Interface attached to each element defining how it should appear in the editor canvas
 */
export interface BaseElementViewData {
  // The position of the element in the world relative to the origin point
  pos: Point,

  // The current state of this element
  state: ElementStates,

  // The level at which this element should be rendered in the canvas
  zIndex: number,

  // The margin around the element
  margin: number,

  // The padding inside the element
  padding: number,

  // [key: string]: any
};