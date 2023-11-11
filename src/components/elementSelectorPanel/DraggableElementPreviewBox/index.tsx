import css from "./styles.module.css";

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
      className={css.element}
      draggable={true}
      onDragStart={(_) => handleDragStart()}
    >
      <img 
        src={getAssetSrc(imageURL)}
        height={50}
        width="auto" 
      />
      {displayName}
    </div>
  );
};

export default DraggableElementPreviewBox;