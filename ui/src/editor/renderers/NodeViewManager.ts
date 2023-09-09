import Node from "../../model/elements/Node";
import { CanvasState } from "../../types";
import ConnectionPointViewManager from "./ConnectionPointViewManager";
import ElementViewManager from "./ElementViewManager";
import Element from "../../model/elements/Element";

const NODE_WIDTH: number = 50;
const NODE_HEIGHT: number = 50;

class NodeRenderer extends ElementViewManager {

  node: Node;

  constructor(node: Node) {
    super();
    this.node = node;
  }

  elementUnderMouse(canvasState: CanvasState): Element | null {
    return null;
  }

  draw(ctx: CanvasRenderingContext2D, canvasState: CanvasState): void {
    ctx.beginPath();
    ctx.fillStyle = 'blue';
    ctx.roundRect(this.node.viewData.pos.x, this.node.viewData.pos.y, NODE_WIDTH, NODE_HEIGHT, 5);
    ctx.fill();

    ctx.font = "10px Arial";
    ctx.fillText(this.node.id, this.node.viewData.pos.x, this.node.viewData.pos.y + NODE_HEIGHT + 10);

    ctx.closePath();

    // Draw connections
    this.node.connections.forEach((connection) => connection.renderer.draw(ctx, canvasState));
    ConnectionPointViewManager.drawConnectionPoints(this.node, ctx, canvasState);
  }
}

export default NodeRenderer;