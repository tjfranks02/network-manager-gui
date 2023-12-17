import css from "./styles.module.css";

type TextInputProps = {
  title: string;
  text: string;
  onTextChange: (text: string) => void;
};

const TextInput = ({ title, text, onTextChange }: TextInputProps) => {

  return (
    <div className={css.container}>
      <label className={css.label}>{title}</label> 
      <input 
        className={css.input}
        value={text}
        onChange={(event) => onTextChange(event.target.value)}
      />
    </div>
  );
};

export default TextInput; 