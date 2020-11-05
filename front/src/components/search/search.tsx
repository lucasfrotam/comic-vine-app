import React, { useEffect, useState, useCallback } from 'react';
import './search.css';

interface SearchProps {
  onSearchClick: (name: string) => void;
}

export const Search = ({ onSearchClick }: SearchProps) => {
  const [value, setValue] = useState(" ");

  useEffect(() => {
    if (!value) onSearchClick("");
  }, [value]);

  const handleSubmit = useCallback((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearchClick(value.trim());
  }, [value, onSearchClick])

  return (
    <form className="search" onSubmit={handleSubmit}>
      <input
        type="search"
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder="Search characters"
      />
      <button type="submit">Search</button>
    </form>
  );
};