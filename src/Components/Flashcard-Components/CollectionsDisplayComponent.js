import React from "react";

function CollectionsDisplayComponent({
  displayTitle,
  username,
  collections,
  openFlashcard,
}) {
  return (
    <div className="collections-display">
      <div className="collections-container">
        <h1>{displayTitle}</h1>
        <div className="collection-items-continer">
          {collections.map((collection, index) => (
            <div
              className="collection-item"
              key={index}
              onClick={() => openFlashcard(collection.id)}
            >
              <h2>{collection.title}</h2>
              <h3>{collection.description}</h3>
              <div className="collection-item-num-container">
                <div className="collection-item-num-terms">
                  {collection.flashcardIds.length} terms
                </div>
              </div>
              <div className="collection-item-username">
                <div className="collection-item-username-img"></div>
                <h3>{username}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CollectionsDisplayComponent;
