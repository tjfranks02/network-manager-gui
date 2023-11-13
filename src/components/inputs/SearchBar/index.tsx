import { ChangeEvent, useState } from "react";
import { Search } from "lucide-react";

import css from "./styles.module.css";

/**
 * Search bar component to be reused across the application.
 * 
 * Props:
 *   onSearchTermChange - function to be called when the search term in the input changes.
 */
const SearchBar = ({ onSearchTermChange }: { onSearchTermChange: (searchTerm: string) => void }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleInputTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchTerm(e.currentTarget.value);
    onSearchTermChange(e.currentTarget.value);
  };

  return (
    <div className={css.container}>
      <div className={css.iconWrapper}>
        <Search width={15} height={15} />
      </div>
      <input 
        type="text" 
        placeholder="Search"
        className={css.input}
        value={searchTerm}
        onChange={handleInputTextChange}
      />
    </div>
  );
};

export default SearchBar;