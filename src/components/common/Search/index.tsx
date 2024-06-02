import React, { useState, ChangeEvent, KeyboardEvent } from "react";
import "./styles.scss";
import SearchIcon from "../../assets/searchicon";

interface SearchProps {
  onSearch: (searchText: string) => void;
}

const Search: React.FC<SearchProps> = ({ onSearch }) => {
  const [value, setValue] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const searchText = e.target.value;
    setValue(searchText);
    onSearch(searchText);
  };

  // Function to search on keypress 
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch(value);
    }
  };

  return (
    <div className="search-wrap">
      <input
        type="text"
        className="search-input"
        placeholder="Search..."
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <button className="search-btn">
        <SearchIcon />
      </button>
    </div>
  );
};

export default Search;
