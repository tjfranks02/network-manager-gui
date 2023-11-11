import store from "../../../redux/store";
import { setCurrentDraggedElement } from "../../../redux/reducers/currentDraggedElement";
import { ReactElement } from "react";
import css from "./styles.module.css";
import ElementPreviewBox from "../DraggableElementPreviewBox";

const ELEMENTS = [
  {
    displayName: "Node",
    className: "Node",
    imageURL: "vm.png"
  },
  {
    displayName: "Node Group",
    className: "NodeGroup",
    imageURL: "vm.png"
  },
  {
    displayName: "Connection",
    className: "Connection",
    imageURL: "vm.png"
  },
  {
    displayName: "VM",
    className: "VM",
    imageURL: "vm.png"
  }
];

const ElementSelectorPanel = () => {
  const renderElements = (): Array<ReactElement> => {
    return ELEMENTS.map((element, index) => {
      return(
        <ElementPreviewBox
          key={index}
          handleDragStart={() => {
            store.dispatch(setCurrentDraggedElement(element.className));
          }}
          imageURL={element.imageURL}
          displayName={element.displayName}
        />
      );
    });
  };

  return (
    <div>
      <h3>Element selector panel</h3>
      <div>
        {renderElements()}
      </div>
    </div>
  );
};

export default ElementSelectorPanel;