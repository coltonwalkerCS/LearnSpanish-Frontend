import React, { useState, useEffect, useRef } from "react";
import Searchbar from "../Components/Flashcard-Components/Searchbar";
function StoryTimePage() {
  const [IOGPTRequest, setIOGPTRequest] = useState({
    inputs: [
      "1 This is an example of what the input for chat gpt would look like.....",
      "2 This is an example of what the input for chat gpt would look like.....",
      "3 This is an example of what the input for chat gpt would look like.....",
      "4 This is an example of what the input for chat gpt would look like.....",
      "5 This is an example of what the input for chat gpt would look like.....",
      "6 This is an example of what the input for chat gpt would look like.....",
    ],
    outputs: [
      "1 This is an example of what the output for chat gpt would look like  asdkfhas; dfj;asdlkfj asdlfj sadlkf j",
      "2 This is an example of what the output for chat gpt would look like  asdkfhas; dfj;asdlkfj asdlfj sadlkf j",
      "3 This is an example of what the output for chat gpt would look like  asdkfhas; dfj;asdlkfj asdlfj sadlkf j",
      "4 This is an example of what the output for chat gpt would look like  asdkfhas; dfj;asdlkfj asdlfj sadlkf j",
      "5 This is an example of what the output for chat gpt would look like  asdkfhas; dfj;asdlkfj asdlfj sadlkf j",
      "6 This is an example of what the output for chat gpt would look like  asdkfhas; dfj;asdlkfj asdlfj sadlkf j",
    ],
  });

  // Handle selecting words

  const [selectedWords, setSelectedWords] = useState([]);

  const deleteWord = (wordIdx) => {
    setSelectedWords((currentWords) =>
      currentWords.filter((_, i) => i !== wordIdx)
    );
  };

  const handleClickWord = (word) => {
    if (!selectedWords.includes(word)) {
      setSelectedWords([...selectedWords, word]);
    }
  };

  const [selectedCollection, setSelectedCollection] = useState({});

  return (
    <>
      <div className="story-time-full-page">
        <div className="story-time-container">
          <div className="gpt-selection-container-words-container">
            <div className="gpt-select-collection-container">
              <div>
                <Searchbar setSelectedCollection={setSelectedCollection} />
              </div>
              <div className="selected-collection-card">
                <h2>Collection Selected: </h2>
                <h2>{selectedCollection.title}</h2>
              </div>
            </div>
            <div className="gpt-selected-words-container">
              <div className="selected-words-header">
                <h1>Selected Words</h1>
              </div>
              <div className="selected-words-list-card">
                <div className="selected-words-container">
                  {selectedWords.map((word, index) => (
                    <div className="selected-words-item" key={index}>
                      <div className="selected-item-word">{word}</div>
                      <div id="x-mark-icon" onClick={() => deleteWord(index)} />
                    </div>
                  ))}
                </div>
              </div>
              <div className="selected-words-add-button-card">
                <button>Add to a Collection</button>
                <button>Create a new Collection</button>
              </div>
            </div>
          </div>
          <div className="gpt-text-response-container">
            <div className="gpt-text-output-card">
              <div className="text-output-card">
                {IOGPTRequest.inputs.map((input, index) => (
                  <div className="input-output-response-card" key={index}>
                    <div className="input-response-item">
                      <h2 className="identifier-for-text">You: </h2>
                      <h2 className="item-text">{input}</h2>
                    </div>
                    <div className="output-response-item">
                      <h2 className="identifier-for-text">Gpt: </h2>
                      <h2 className="item-text">
                        {IOGPTRequest.outputs[index]
                          .split(" ")
                          .map((word, index) => (
                            <span
                              key={index}
                              onClick={() => handleClickWord(word)}
                            >
                              {word}
                            </span>
                          ))}
                      </h2>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="gpt-text-input-card">
              <textarea placeholder="Enter a story request... "></textarea>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default StoryTimePage;
