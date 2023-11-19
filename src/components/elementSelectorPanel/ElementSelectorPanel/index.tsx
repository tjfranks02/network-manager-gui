import { useState } from "react";
import store from "../../../redux/store";
import { setCurrentDraggedElement } from "../../../redux/reducers/currentDraggedElement";
import { ReactElement } from "react";
import css from "./styles.module.css";
import ElementPreviewBox from "../DraggableElementPreviewBox";
import SearchBar from "../../inputs/SearchBar";
import { ElementTypes } from "../../../constants/editorConstants";

const ELEMENTS = [
  {
    displayName: "Node",
    className: ElementTypes.NODE,
    imageURL: "vm.png"
  },
  {
    displayName: "Node Group",
    className: ElementTypes.NODE_GROUP,
    imageURL: "vm.png"
  },
  {
    displayName: "Connection",
    className: ElementTypes.CONNECTION,
    imageURL: "connection.png"
  },
  {
    displayName: "VM",
    className: "VM",
    imageURL: "vm.png"
  }
];

const ElementSelectorPanel = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSearchTermChange = (newSearchTerm: string) => {
    setSearchTerm(newSearchTerm);
    console.log(searchTerm);
    // I guess we should then make a call to an API to get search results
  };

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
    <div className={css.container}>
      <SearchBar onSearchTermChange={handleSearchTermChange} />
      <h3>Components</h3>
      <div className={css.elementsContainer}>
        {renderElements()}
      </div>
    </div>
  );
};

export default ElementSelectorPanel;