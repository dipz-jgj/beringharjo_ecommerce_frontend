import React, { useRef, forwardRef } from "react";

interface SearchBarProps {
  onSearch: (term: string) => void;
  placeholder?: string;
}

export const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>(
  ({ onSearch, placeholder = "Search products..." }, ref) => {
    // ============= DESTRUCTURING =============
    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>): void => {
      const { value: searchTerm } = event.target;
      onSearch(searchTerm);
    };

    return (
      <div className="mb-6">
        <input
          ref={ref}
          type="text"
          placeholder={placeholder}
          onChange={handleSearch}
          className="w-full max-w-md p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    );
  }
);

SearchBar.displayName = "SearchBar";
