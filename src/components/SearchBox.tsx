import { useRef, useState } from "react";
import "./SearchBox.css";

function SearchBox() {
  const inputRef = useRef<HTMLInputElement>(null);
  const lastLinkRef = useRef<HTMLAnchorElement>(null);
  const [searchValue, setSearchValue] = useState("");
  const [onFocus, setOnFocus] = useState(false);
  const [results, setResults] = useState<Array<string>>();

  console.log("Dummy Logs", onFocus, setResults);

  return (
    <div>
      <div className="relative search-box">
        <input
          ref={inputRef}
          tabIndex={0}
          data-testid={0}
          className="search-box__input"
          type="text"
          placeholder="Search..."
          value={searchValue}
          onFocus={() => setOnFocus(true)}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <button id="close-btn" className="search-box__icon">
          X
        </button>
      </div>
      <div className="relative">
        <div className="search-box__results">
          <ul>
            {results?.map((item, index) => (
              <li key={index}>
                <a href={item} data-testid={index + 1} tabIndex={index + 1}>
                  {item}
                </a>
              </li>
            ))}
          </ul>
          {searchValue.length > 0 && (
            <a
              data-testid={6}
              ref={lastLinkRef}
              href={`/search?q=${searchValue}`}
              className="search-box__results__footer"
            >
              Search: &quot;<span className="truncate">{searchValue}</span>
              &quot;
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchBox;
