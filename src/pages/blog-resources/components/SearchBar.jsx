import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';

const SearchBar = ({ onSearch, placeholder = "Search articles..." }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    // Real-time search
    onSearch(e.target.value);
  };

  return (
    <form onSearch={handleSearch} className="relative">
      <div className="relative">
        <Input
          type="search"
          placeholder={placeholder}
          value={searchTerm}
          onChange={handleInputChange}
          className="pl-10 pr-4"
        />
        <Icon
          name="Search"
          size={18}
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary"
        />
      </div>
    </form>
  );
};

export default SearchBar;