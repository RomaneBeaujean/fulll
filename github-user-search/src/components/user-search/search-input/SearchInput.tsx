import { useEffect, useState } from "react";
import "./SearchInput.css";

interface SearchInputProps {
  handleSearch: (value: string) => void;
  typingDelay: number;
}

export default function SearchInput({ handleSearch, typingDelay }: SearchInputProps) {

  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const searchAfterDelay = setTimeout(() => {
      handleSearch(inputValue);
    }, typingDelay);

    return () => clearTimeout(searchAfterDelay);
  }, [inputValue, typingDelay, handleSearch]);

  return (
    <div className="search-input">
      <input
        aria-label="User name"
        placeholder="User name"
        type="text"
        value={inputValue}
        data-testid="search-input"
        onChange={e => setInputValue(e.target.value)}
      />
    </div>
  )
}
