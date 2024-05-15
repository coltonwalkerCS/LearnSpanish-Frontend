import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import FlashcardHeader from "../Components/Flashcard-Components/FlashcardHeader";
import CollectionsDisplayComponent from "../Components/Flashcard-Components/CollectionsDisplayComponent";

function FlashcardPage() {
  const [collectionsRecent, setCollectionsRecent] = useState([]);
  const [collectionsAll, setCollectionsAll] = useState([]);

  const username = localStorage.getItem("username");

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/v1/collections/recent:${username}`)
      .then((response) => {
        setCollectionsRecent(response.data);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/v1/collections/username:${username}`)
      .then((response) => {
        setCollectionsAll(response.data);
      });
  }, []);

  const openFlashcard = (collectionId) => {
    window.location.href = `/practice-collection?itemId=${collectionId}`;
  };

  return (
    <div className="flashcards-page">
      <FlashcardHeader />
      <CollectionsDisplayComponent
        displayTitle={"Recent Collections"}
        username={username}
        collections={collectionsRecent}
        openFlashcard={openFlashcard}
      />
      <CollectionsDisplayComponent
        displayTitle={"All Collections"}
        username={username}
        collections={collectionsAll}
        openFlashcard={openFlashcard}
      />
    </div>
  );
}

export default FlashcardPage;
