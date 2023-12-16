import { MouseEvent } from "react";
import Point from "../editor/utils/Point";

export const mapClientCoordsToMouse = (event: MouseEvent): Point => {
  const bounds = event.currentTarget.getBoundingClientRect();

  const mouseX = event.clientX - bounds.left;
  const mouseY = event.clientY - bounds.top;
  return new Point(mouseX, mouseY);
};