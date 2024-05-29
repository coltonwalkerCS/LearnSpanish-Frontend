import React, { useState, useEffect } from "react";
import axios from "axios";

function Searchbar({ setSelectedCollection }) {
  const [collectionSearch, setCollectionSearch] = useState("");
  const [collections, setCollections] = useState([]);
  const [filteredCollections, setFilteredCollections] = useState([]);
  const username = localStorage.getItem("username");

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/v1/collections/username:${username}`)
      .then((response) => {
        setCollections(response.data);
      });
  }, []);

  const handleSearch = (e) => {
    const searchText = e.target.value;
    e.preventDefault();
    setCollectionSearch(searchText);

    if (searchText.length > 0) {
      const filteredData = collections
        .filter((collection) =>
          collection.title.toLowerCase().includes(searchText.toLowerCase())
        )
        .slice(0, 5);
      setFilteredCollections(filteredData);
    } else {
      setFilteredCollections([]);
    }
  };

  const collectionSelected = (collection) => {
    console.log(collection);
    setSelectedCollection(collection);
    setCollectionSearch("");
  };

  return (
    <div>
      <div className="searchbar-component-container">
        <input
          type="text"
          placeholder="Search collections..."
          onChange={handleSearch}
          value={collectionSearch}
        />
      </div>
      <div className="searchbar-results-dropdown-container">
        <div className="searchbar-results-dropdown-selection-card">
          {collectionSearch && filteredCollections.length > 0 && (
            <div className="results-dropdown">
              {filteredCollections.map((collection, index) => (
                <div
                  className="results-dropdown-item"
                  key={index}
                  onClick={() => collectionSelected(collection)}
                >
                  {collection.title}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Searchbar;
