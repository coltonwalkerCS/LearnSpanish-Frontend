import React from "react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import FlashcardHeader from "../Components/Flashcard-Components/FlashcardHeader";

function PracticeCollection() {
  const [collectionState, setCollectionState] = useState({
    search: "",
    data: {},
    title: "",
    totalNumItems: 0,
    itemNumber: 0,
    sideOne: "",
    sideTwo: "",
    newCard: false,
    isShuffled: false,
    flashCards: [],
  });

  const [uiState, setUiState] = useState({
    isFlipped: false,
    animationDirection: "",
    shuffleIcon: false,
  });

  const location = useLocation();

  useEffect(() => {
    const itemId = new URLSearchParams(location.search).get("itemId");
    if (!itemId) return;

    axios
      .get(`http://localhost:8080/api/v1/collections/id:${itemId}`)
      .then((response) => {
        const { title, flashcardIds } = response.data;

        setCollectionState((prevState) => ({
          ...prevState,
          data: response.data,
          title,
          totalNumItems: flashcardIds.length,
          sideOne: flashcardIds[prevState.itemNumber]?.sideOne ?? "",
          sideTwo: flashcardIds[prevState.itemNumber]?.sideTwo ?? "",
          flashCards: flashcardIds,
        }));
      });
  }, [location]);

  useEffect(() => {
    const flashcardIds = collectionState.flashCards;
    if (flashcardIds.length !== 0) {
      const { itemNumber } = collectionState;
      setCollectionState((prevState) => ({
        ...prevState,
        sideOne: flashcardIds[itemNumber].sideOne,
        sideTwo: flashcardIds[itemNumber].sideTwo,
        newCard: !prevState.newCard,
      }));
    }

    let shuffleTimeout;
    setUiState((prevState) => {
      const shuffleAlert = collectionState.isShuffled;

      clearTimeout(shuffleTimeout);

      shuffleTimeout = setTimeout(() => {
        setUiState((prevState) => ({
          ...prevState,
          shuffleIcon: false,
        }));
      }, 15000);

      return { ...prevState, shuffleIcon: shuffleAlert };
    });
    return () => clearTimeout(shuffleTimeout);
  }, [
    collectionState.itemNumber,
    collectionState.data,
    collectionState.isShuffled,
  ]);

  const handleSearch = (e) => {
    setCollectionState((prevState) => ({
      ...prevState,
      search: e.target.value,
    }));
  };

  const rightArrowFunction = () => {
    if (collectionState.itemNumber < collectionState.totalNumItems - 1) {
      setUiState((prevState) => ({
        ...prevState,
        isFlipped: false,
        animationDirection: "right",
      }));

      setCollectionState((prevState) => {
        const newItemNumber = prevState.itemNumber + 1;
        return { ...prevState, itemNumber: newItemNumber };
      });

      setTimeout(() => {
        setUiState((prevState) => ({ ...prevState, animationDirection: "" }));
      }, 300);
    }
  };

  const leftArrowFunction = () => {
    if (collectionState.itemNumber > 0) {
      setUiState((prevState) => ({
        ...prevState,
        isFlipped: false,
        animationDirection: "left",
      }));

      setCollectionState((prevState) => {
        const newItemNumber = prevState.itemNumber - 1;
        return { ...prevState, itemNumber: newItemNumber };
      });

      setTimeout(() => {
        setUiState((prevState) => ({ ...prevState, animationDirection: "" }));
      }, 300);
    }
  };

  const handleStarClick = (event) => {
    event.stopPropagation();
    console.log("star clicked");
  };

  const shuffleFlashcards = () => {
    setCollectionState((prevState) => {
      const newIsShuffled = !prevState.isShuffled;
      let newFlashcards = [...prevState.data.flashcardIds];

      if (newIsShuffled) {
        for (let i = newFlashcards.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [newFlashcards[i], newFlashcards[j]] = [
            newFlashcards[j],
            newFlashcards[i],
          ];
        }
      }

      const newSideOne = newFlashcards[prevState.itemNumber].sideOne;
      const newSideTwo = newFlashcards[prevState.itemNumber].sideTwo;

      return {
        ...prevState,
        isShuffled: newIsShuffled,
        flashCards: newFlashcards,
        sideOne: newSideOne,
        sideTwo: newSideTwo,
      };
    });
  };

  return (
    <div className="collection-practice-page">
      <FlashcardHeader />
      <div className="collection-page-body">
        <div className="collection-practice-container">
          <div className="collection-title">
            <h1>{collectionState.title}</h1>
          </div>
          <div className="collection-body">
            <div className="collection-body-header">
              <div className="collection-body-header-item">
                <h2>Flashcards</h2>
              </div>
              <div className="collection-body-header-item">
                <h2>Test</h2>
              </div>
            </div>

            {/* Start of body */}
            <div
              className="flashcard-whole-body"
              onClick={() =>
                setUiState((prevState) => ({
                  ...prevState,
                  isFlipped: !prevState.isFlipped,
                }))
              }
            >
              <div
                className={`flashcard-inner ${
                  uiState.isFlipped ? "is-flipped" : ""
                } ${
                  uiState.animationDirection === "right" ? "slide-in-right" : ""
                } ${
                  uiState.animationDirection === "left" ? "slide-in-left" : ""
                }`}
              >
                {/* Side 1 */}
                <div className="front-flashcard">
                  <div className="collection-body-flashcards">
                    <div className="flashcard-container">
                      <div className="flashcard-container-header">
                        <div
                          className="star-icon-container"
                          onClick={handleStarClick}
                        >
                          <div id="star-icon"></div>
                        </div>
                      </div>
                      <div className="flashcard-container-body">
                        <div className="container-body-content">
                          <h2>{collectionState.sideOne}</h2>
                        </div>
                        <div
                          className={` ${
                            uiState.shuffleIcon
                              ? "shuffled-info-bar"
                              : "non-shuffled-info-bar"
                          }`}
                        >
                          Shuffled
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Side 2 */}
                <div className="back-flashcard">
                  <div className="collection-body-flashcards">
                    <div className="flashcard-container">
                      <div className="flashcard-container-header">
                        <div
                          className="star-icon-container"
                          onClick={handleStarClick}
                        >
                          <div id="star-icon"></div>
                        </div>
                      </div>
                      <div className="flashcard-container-body">
                        <div className="container-body-content">
                          <h2>{collectionState.sideTwo}</h2>
                        </div>
                        <div
                          className={` ${
                            uiState.shuffleIcon
                              ? "shuffled-info-bar"
                              : "non-shuffled-info-bar"
                          }`}
                        >
                          Shuffled
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="collection-body-footer">
              <div className="collection-footer-media-control">
                <div
                  id="shuffle-icon"
                  onClick={() => shuffleFlashcards()}
                ></div>
              </div>
              <div className="collection-footer-flashcard-control">
                <div
                  className="arrow-container"
                  onClick={() => leftArrowFunction()}
                >
                  <div
                    id={
                      collectionState.itemNumber === 0
                        ? "unusable"
                        : "left-icon"
                    }
                  ></div>
                </div>
                <div id="flashcard-fraction">
                  <div className="fraction-card">
                    <h3>
                      {collectionState.itemNumber + 1} /{" "}
                      {collectionState.totalNumItems}
                    </h3>
                  </div>
                </div>
                <div
                  className="arrow-container"
                  onClick={() => rightArrowFunction()}
                >
                  <div
                    id={
                      collectionState.itemNumber ===
                      collectionState.totalNumItems - 1
                        ? "unusable"
                        : "right-icon"
                    }
                  ></div>
                </div>
              </div>
              <div className="collection-footer-options-control">
                <div id="settings-icon"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PracticeCollection;
