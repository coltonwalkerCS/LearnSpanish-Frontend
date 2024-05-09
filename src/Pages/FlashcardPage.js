import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import FlashcardHeader from "../Components/Flashcard-Components/FlashcardHeader";

function FlashcardPage() {
  const [collections, setCollections] = useState([]);
  const username = localStorage.getItem("username");

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/v1/collections/recent:${username}`)
      .then((response) => {
        setCollections(response.data);
      });
  }, []);

  const openFlashcard = (collectionId) => {
    window.location.href = `/practice-collection?itemId=${collectionId}`;
  };

  return (
    <div className="flashcards-page">
      <FlashcardHeader />
      <div className="flashcards-recent">
        <div className="flashcards-recent-container">
          <h1>Recent</h1>
          <div className="flashcard-items-container">
            {collections.map((collection, index) => (
              <div
                className="flashcard-recent-item"
                key={index}
                onClick={() => openFlashcard(collection.id)}
              >
                <h2>{collection.title}</h2>
                <h3>{collection.description}</h3>
                <div className="recent-item-num-container">
                  <div className="recent-item-num-terms">
                    {collection.flashcardIds.length} terms
                  </div>
                </div>
                <div className="recent-item-username">
                  <div className="recent-item-username-img"></div>
                  <h3>{username}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FlashcardPage;
