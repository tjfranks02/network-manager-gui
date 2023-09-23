import store from "../../../redux/store";
import { setCurrentDraggedElement } from "../../../redux/reducers/currentDraggedElement";
import { ReactElement, DragEvent } from "react";
import css from "./styles.module.css";

const ELEMENTS = [
  "Node",
  "Node group",
  "Connection"
];

const ElementSelectorPanel = () => {

  const handleDragStart = (elementName: string, event: DragEvent<HTMLLIElement>) => {
    store.dispatch(setCurrentDraggedElement(elementName));
  };

  const renderElements = (): Array<ReactElement> => {
    return ELEMENTS.map((element) => {
      return(
        <li
          key={element}
          className={css.element}
          draggable={true}
          onDragStart={(event) => handleDragStart(element, event)}
        >
          {element}
        </li>
      );
    });
  };

  return (
    <div className={css.container}>
      <h3>Element selector panel</h3>
      <ul>
        {renderElements()}
      </ul>
    </div>
  );
};

export default ElementSelectorPanel;