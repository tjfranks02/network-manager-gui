import Point from "../editor/utils/Point";

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
  CONNECTION = "connection",
  NODE_GROUP = "nodeGroup",
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
export const SCALE_DELTA = 0.025;

/**
 * Theme infomration for editor nodes
 * 
 */
// Font info
export const DEFAULT_FONT = "10px Arial";

// Node colours
export const NODE_IDLE_COLOUR = "blue";
export const NODE_HOVER_COLOUR = "darkblue";

// Connection colours
export const CONNECTION_IDLE_COLOUR = "green";
export const CONNECTION_HOVER_COLOUR = "orange";

// Node connection point colours
export const CONNECTION_POINT_IDLE_COLOUR = "red";

// Node group colours
export const NODE_GROUP_IDLE_COLOUR = "red";
export const NODE_GROUP_HOVER_COLOUR = "gold";

/**
 * 
 */
export const NodeGroupViewConstants: any = {
  NUM_NODES_IN_ROW: 3,
  WIDTH: 50,
  HEIGHT: 50
};

export const NodeViewConstants: any = {
  WIDTH: 50,
  HEIGHT: 50
};