import { useState } from "react";
import store from "../../../redux/store";
import { setCurrentDraggedElement } from "../../../redux/reducers/currentDraggedElement";
import { ReactElement } from "react";
import css from "./styles.module.css";
import ElementPreviewBox from "../DraggableElementPreviewBox";
import SearchBar from "../../SearchBar";

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
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSearchTermChange = (searchTerm: string) => {
    setSearchTerm(searchTerm);
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