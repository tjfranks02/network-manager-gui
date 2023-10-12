import Point from "./utils/Point";

export enum ElementStates {
  IDLE = 1,
  ACTIVE,
  FOLLOW_MOUSE,
  CLICKED,
  INCOMPLETE
};

export enum ConnectionStates {
};

export enum ElementTypes {
  NODE = "node",
  Connection = "connection",
};

export const DEFAULT_ORIGIN = new Point(0, 0);

/**
 * Default values for canvas sizing
 */
export const DEFAULT_CANVAS_WIDTH = 900;
export const DEFAULT_CANVAS_HEIGHT = 375;

/**
 * Constants relating to the scale value in the view
 */
// Bounds for scale
export const MIN_SCALE = 0.1;
export const MAX_SCALE = 2.0;

// Amount that scale should change with each mouse wheel move
export const SCALE_DELTA = 0.02;