import css from "./styles.module.css";

const ActiveElementPanel = ({ activeElement }: { activeElement: string }) => {
  return (
    <div className={css.container}>
      <h3>Active element panel</h3>
      {activeElement}
    </div>
  );
};

export default ActiveElementPanel;