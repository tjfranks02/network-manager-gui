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

/**
 * Constants relating to the scale value in the view
 */
// Bounds for scale
export const MIN_SCALE = 0.1;
export const MAX_SCALE = 2.0;

// Amount that scale should change with each mouse wheel move
export const SCALE_DELTA = 0.05;