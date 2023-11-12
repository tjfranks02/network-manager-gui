import css from "./styles.module.css";

/**
 * An element that can be dragged from the element selector panel component into the canvas.
 */
const DraggableElementPreviewBox = ({ handleDragStart, imageURL, displayName }: { 
  handleDragStart: () => void,
  imageURL: string,
  displayName: string
}) => {

  const getAssetSrc = (name: string) => {
    const path = `/src/assets/${name}`;
    const modules = import.meta.glob("/src/assets/*", { eager: true });
  
    const mod = modules[path] as { default: string };
    return mod.default;
  };

  return (
    <div
      className={css.container}
      draggable={true}
      onDragStart={(_) => handleDragStart()}
    >
      <img 
        className={css.image}
        src={getAssetSrc(imageURL)}
        height="auto"
        width={25}
      />
      <span>{displayName}</span>
    </div>
  );
};

export default DraggableElementPreviewBox;