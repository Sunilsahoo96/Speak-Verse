import React, { useState } from 'react';
import { Input } from '../common/Input';
import { useNavigate } from 'react-router-dom';
import { RouteSearch } from '../../helpers/RouteName';

export default function SearchBar() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const getInput = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return; 
    navigate(RouteSearch(query));
    setQuery('');
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Input
          value={query}
          onChange={getInput}
          name="q"
          placeholder="Search...."
          className="font-roboto font-medium h-10 rounded-lg focus-visible:ring-darkRed focus:outline-none bg-gray-50"
        />
      </form>
    </>
  );
}