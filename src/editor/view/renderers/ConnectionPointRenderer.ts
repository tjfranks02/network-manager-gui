import CanvasUtils from "../../utils/canvasUtils";
import ElementRenderer from "./ElementRenderer";
import Element from "../../model/elements/Element";
import ConnectionPoint from "../../model/elements/ConnectionPoint";
import EditorView from "../EditorView";
import EditorModel from "../../model/Model";
import Connection from "../../model/elements/Connection";
import { 
  ElementStates,
  CONNECTION_POINT_IDLE_COLOUR
} from "../../../constants/editorConstants";
import ModelUtils from "../../model/utils/modelUtils";
import { BaseElementViewData } from "../../types";
import Point from "../../utils/Point";

const CONNECTION_POINT_RADIUS: number = 5;

class ConnectionPointRenderer extends ElementRenderer {
  connectionPoint: ConnectionPoint;

  constructor(connectionPoint: ConnectionPoint, baseViewData: BaseElementViewData) {
    super(baseViewData);

    this.connectionPoint = connectionPoint;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    let mouseWorldPos: Point = EditorView.mapViewPosToWorldPos(EditorView.viewState.mousePos);

    let shouldDisplay = CanvasUtils.isMouseInRangeOfPoint(mouseWorldPos, this.pos, 5);

    if (shouldDisplay) {
      ctx.beginPath();

      ctx.fillStyle = CONNECTION_POINT_IDLE_COLOUR;
      ctx.arc(this.pos.x, this.pos.y, CONNECTION_POINT_RADIUS, 0, 2 * Math.PI, false);
      ctx.fill();
      
      ctx.closePath();
    }
  }

  elementUnderMouse(mousePos: Point): Element | null {
    if (this.isMouseOverElement(mousePos)) {
      return this.connectionPoint;
    } 
    
    return null;
  }

  isMouseOverElement(mousePos: Point): boolean {
    return CanvasUtils.isMouseInRangeOfPoint(mousePos, this.pos, 5);
  } 

  handleClick(): void {
    if (EditorView.viewState.prevActiveElement instanceof Connection) {
      EditorView.viewState.prevActiveElement.dest = this.connectionPoint.owner;
    } else {
      let newConnection = new Connection(
        ModelUtils.generateUUID(),
        this.connectionPoint.owner,
        null,
        { 
          pos: this.connectionPoint.owner.renderer.pos,
          state: ElementStates.INCOMPLETE, 
          zIndex: -1, 
          margin: 0, 
          padding: 0
        }
      );

      EditorModel.elements.push(newConnection);
      EditorView.assignNewActiveElement(newConnection);
    }
  }

  handleUnclick(): void {

  }

  handleMouseMove(): void {

  }
}

export default ConnectionPointRenderer;