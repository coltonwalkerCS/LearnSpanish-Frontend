import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

function FlashcardHeader() {
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

  const openFlashcard = (collectionId) => {
    window.location.href = `/practice-collection?itemId=${collectionId}`;
  };

  const createNewCollection = () => {
    window.location.href = `/create-collection`;
  };

  return (
    <div className="flashcards-header">
      <div className="searchbar-container">
        <div className="flashcards-searchbar">
          <div className="searchbar-card">
            <input
              type="text"
              placeholder="Search your collections"
              onChange={handleSearch}
              value={collectionSearch}
            />
          </div>

          <div className="dropdown-holder">
            <div className="dropdown-selection-container">
              {collectionSearch && filteredCollections.length > 0 && (
                <div className="dropdown">
                  {filteredCollections.map((collection, index) => (
                    <div
                      className="dropdown-item"
                      key={index}
                      onClick={() => openFlashcard(collection.id)}
                    >
                      {collection.title}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div
        className="flashcards-add-card"
        onClick={() => createNewCollection()}
      >
        <div className="flashcards-add-item">
          <div id="flashcards-add-mark1" />
          <div id="flashcards-add-mark2" />
        </div>
      </div>
    </div>
  );
}

export default FlashcardHeader;
