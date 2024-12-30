import React, { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import './SearchBox.css';

interface SearchBoxProps {
  suggestions: string[];
}

export const SearchBox: React.FC<SearchBoxProps> = ({ suggestions }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const lastRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
        inputRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (searchTerm) {
        const filtered = suggestions.filter(suggestion =>
          suggestion.toLowerCase().includes(searchTerm.toLowerCase())
        ).slice(0, 5);
        setFilteredSuggestions(filtered);
      } else {
        setFilteredSuggestions(suggestions.slice(0, 5));
      }
    }, 250);

    return () => clearTimeout(debounceTimer);
  }, [searchTerm, suggestions]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (selectedIndex < filteredSuggestions.length - 1) {
        setSelectedIndex(prev => prev + 1);
      } else if (searchTerm && selectedIndex === filteredSuggestions.length - 1) {
        setSelectedIndex(-1);
        inputRef.current?.focus();
      } else {
        setSelectedIndex(-1);
        inputRef.current?.focus();
      }
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (selectedIndex > 0) {
        setSelectedIndex(prev => prev - 1);
      } else if (selectedIndex === 0) {
        setSelectedIndex(-1);
        inputRef.current?.focus();
      } else if (searchTerm) {
        setSelectedIndex(filteredSuggestions.length - 1);
      }
    }
  };

  return (
    <div className="search-container" ref={searchRef}>
      {isOpen && (
        <div className="search-box" onKeyDown={handleKeyDown}>
          <div className="search-input-wrapper">
            <Search className="search-icon" size={20} />
            <input
              ref={inputRef}
              type="text"
              className="search-input"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              autoFocus
            />
            <button className="close-button" onClick={() => setIsOpen(false)}>
              <X size={20} />
            </button>
          </div>
          
          <div className="search-suggestions">
            {filteredSuggestions.map((suggestion, index) => (
              <div
                key={suggestion}
                className={`suggestion-item ${selectedIndex === index ? 'selected' : ''}`}
                tabIndex={0}
              >
                {suggestion}
              </div>
            ))}
            {searchTerm && (
              <div 
                ref={lastRef}
                className={`suggestion-item last-ref ${
                  selectedIndex === filteredSuggestions.length ? 'selected' : ''
                }`}
                tabIndex={0}
              >
                Press Enter to search for "{searchTerm}"
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};