import React, { useState, useMemo, useRef, useEffect } from 'react';
import SearchCard from '../SearchCard';

const SearchComponent = ({ data, onSelect }) => {

  const [isVisible, setVisibility] = useState(false);
  const [search, setSearch] = useState("");
  const [cursor, setCursor] = useState(-1);

  const showSuggestion = () => setVisibility(true);
  const hideSuggestion = () => setVisibility(false);

  const searchContainer = useRef(null);
  const searchResultRef = useRef(null);

  useEffect(() => {
    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    if(searchContainer.current && searchContainer.current.contains(event.target)){
      hideSuggestion();
    }
  }

  const scrollIntoView = (position) => {
    searchResultRef.current.parentNode.scrollTo({
      top: position,
      behaviour: "smooth"
    })
  }

  const suggestions = useMemo(() => {
    if(!search) return data;

    return data.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()))
  }, [data, search])

  const keyboardNavigation = (e) => {
    if (e.key === "ArrowDown") {
      isVisible
        ? setCursor((c) => (c < suggestions.length ? c + 1 : c))
        : showSuggestion();
    }
    if (e.key === "ArrowUp") {
      setCursor((c) => (c > 0 ? c - 1 : 0));
    }
    if (e.key === "Escape") {
      hideSuggestion();
    }
    if (e.key === "Enter" && cursor > 0) {
      setSearch(suggestions[cursor].name);
      hideSuggestion();
      onSelect(suggestions[cursor]);
    }
  };

  useEffect(() => {
    if (cursor < 0 || cursor > suggestions.length || !searchResultRef) {
      return () => {};
    }
    let listItems = Array.from(searchResultRef.current.children);
    listItems[cursor] && scrollIntoView(listItems[cursor].offsetTop);
  }, [cursor]);

  return (
    <div className='form-group' ref={searchContainer}>
      <div>
        <input 
          type='text'
          name='search'
          autoComplete='off'
          placeholder='Search Users by ID, address, name'
          className='form-control form-control-lg'
          onClick={showSuggestion}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => keyboardNavigation(e)}
        />
        <div className={`search-result ${isVisible ? "visible": "invisible"}`}>
          <ul className="list-group" ref={searchResultRef}>
            {suggestions.map((item, idx) => (
              <SearchCard key={item.id} {...item} 
              onSelectItem={() => {
                hideSuggestion();
                setSearch(item.name);
                onSelect(item);
              }}
              isHighlighted={cursor === idx ? true : false} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default SearchComponent;