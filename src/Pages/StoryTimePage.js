import React, { useState, useEffect, useRef } from "react";

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

  const text = "This is a sample text with several words to click.";

  const [selectedWords, setSelectedWords] = useState([]);

  const handleClickWord = (word) => {
    setSelectedWords([...selectedWords, word]);
  };

  return (
    <>
      <div className="story-time-full-page">
        <div className="story-time-container">
          <div className="gpt-select-flashcards-container">
            select flash container
          </div>
          <div className="gpt-text-response-container">
            <div className="gpt-text-output-card">
              {IOGPTRequest.inputs.map((input, index) => (
                <div className="input-output-response-card">
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
                            style={{ margin: "0 2.1px" }}
                          >
                            {word}
                          </span>
                        ))}
                    </h2>
                  </div>
                </div>
              ))}
            </div>
            <div className="gpt-text-input-card">
              <textarea placeholder="Enter a request... "></textarea>
            </div>
          </div>
          <div className="gpt-selected-words-container">
            <div className="selected-words-header">
              <h1>Selected words</h1>
            </div>
            <div>
              <ul>
                {selectedWords.map((word, index) => (
                  <li className="selected-words-li" key={index}>
                    {word}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <button>Add to collection</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default StoryTimePage;
