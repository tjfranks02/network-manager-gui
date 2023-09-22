import Element from "../../../model/elements/Element";

import css from "./styles.module.css";

const ActiveElementPanel = ({ activeElement }: { activeElement: Element }) => {
  return (
    <div className={css.container}>
      <h3>Active element panel</h3>
      {activeElement ? activeElement.id : null}
    </div>
  );
};

export default ActiveElementPanel;