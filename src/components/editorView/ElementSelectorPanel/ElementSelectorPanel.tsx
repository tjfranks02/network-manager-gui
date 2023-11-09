import store from "../../../redux/store";
import { setCurrentDraggedElement } from "../../../redux/reducers/currentDraggedElement";
import { ReactElement, DragEvent } from "react";
import css from "./styles.module.css";

const ELEMENTS = [
  {
    displayName: "Node",
    className: "Node",
  },
  {
    displayName: "Node Group",
    className: "NodeGroup"
  },
  {
    displayName: "Connection",
    className: "Connection"
  },
  {
    displayName: "VM",
    className: "VM"
  }
];

const ElementSelectorPanel = () => {

  const handleDragStart = (elementName: string, event: DragEvent<HTMLLIElement>) => {
    store.dispatch(setCurrentDraggedElement(elementName));
  };

  const renderElements = (): Array<ReactElement> => {
    return ELEMENTS.map((element) => {
      return(
        <li
          key={element.className}
          className={css.element}
          draggable={true}
          onDragStart={(event) => handleDragStart(element.className, event)}
        >
          {element.displayName}
        </li>
      );
    });
  };

  return (
    <div>
      <h3>Element selector panel</h3>
      <ul>{renderElements()}</ul>
    </div>
  );
};

export default ElementSelectorPanel;