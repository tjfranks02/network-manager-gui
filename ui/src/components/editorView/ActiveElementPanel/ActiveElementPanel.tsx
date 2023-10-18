import css from "./styles.module.css";

const ActiveElementPanel = ({ activeElement }: { activeElement: string }) => {
  return (
    <div className={css.container} style={{ backgroundColor: "purple"}} >
      <h3>Active element panel</h3>
      {activeElement}
    </div>
  );
};

/**
 * What needs to happen when we drag a new element into the editor?
 * 1. We need to detect which type of element it is
 * 2. We need
 */

export default ActiveElementPanel;