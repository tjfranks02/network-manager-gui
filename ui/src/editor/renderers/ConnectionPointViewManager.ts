import CanvasUtils from "../../model/utils/canvasUtils";
import Point from "../../model/utils/Point";
import { CanvasState } from "../../types";
import Node from "../../model/elements/Node";

const NODE_WIDTH: number = 50;
const NODE_HEIGHT: number = 50;

const CONNECTION_POINT_RADIUS: number = 5;

class ConnectionPointViewManager {
  static drawConnectionPoints(node: Node, ctx: CanvasRenderingContext2D, canvasState: CanvasState) {
    let topConnectorPos = new Point(
      node.viewData.pos.x + (NODE_WIDTH / 2), node.viewData.pos.y
    );
    let rightConnectorPos = new Point(
      node.viewData.pos.x + NODE_WIDTH, node.viewData.pos.y + (NODE_HEIGHT / 2)
    );
    let bottomConnectorPos = new Point(
      node.viewData.pos.x + (NODE_WIDTH / 2), node.viewData.pos.y + NODE_HEIGHT
    );
    let leftConnectorPos = new Point(
      node.viewData.pos.x, node.viewData.pos.y + (NODE_HEIGHT / 2)
    );

    ConnectionPointViewManager.drawConnectionPoint(topConnectorPos, ctx, canvasState);
    ConnectionPointViewManager.drawConnectionPoint(rightConnectorPos, ctx, canvasState);
    ConnectionPointViewManager.drawConnectionPoint(bottomConnectorPos, ctx, canvasState);
    ConnectionPointViewManager.drawConnectionPoint(leftConnectorPos, ctx, canvasState);
  }

  static drawConnectionPoint(pos: Point, ctx: CanvasRenderingContext2D, canvasState: CanvasState): void {
    let shouldDisplay = CanvasUtils.isMouseInRangeOfPoint(canvasState.mousePos, pos, 5);
    
    if (shouldDisplay) {
      ctx.beginPath();

      ctx.fillStyle = 'red';
      ctx.arc(pos.x, pos.y, CONNECTION_POINT_RADIUS, 0, 2 * Math.PI, false);
      ctx.fill();
      
      ctx.closePath();
    }
  }
}

export default ConnectionPointViewManager;