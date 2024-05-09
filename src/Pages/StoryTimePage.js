import React, { useState } from "react";

function StoryTimePage() {
  const [gptRequest, setGptRequest] = useState("");
  const [testInput, setTestInput] = useState(
    "This is an example of what the input for chat gpt would look like....."
  );
  const [testOutput, setTestOutput] = useState(
    "This is an example of what the output for chat gpt would look like  asdkfhas; dfj;asdlkfj asdlfj sadlkf j"
  );

  return (
    <>
      <div className="story-time-full-page">
        <div className="story-time-container">
          <div className="gpt-select-flashcards-container">
            select flash container
          </div>
          <div className="gpt-text-response-container">
            <div className="gpt-text-output-card">
              <div className="input-output-response-card">
                <div className="input-response-item">
                  <h2 className="identifier-for-text">You: </h2>
                  <h2 className="item-text">{testInput}</h2>
                </div>
                <div className="output-response-item">
                  <h2 className="identifier-for-text">Gpt: </h2>
                  <h2 className="item-text">{testOutput}</h2>
                </div>
              </div>
            </div>
            <div className="gpt-text-input-card">
              <textarea placeholder="Enter a request... "></textarea>
            </div>
          </div>
          <div className="gpt-selected-words-container">
            selected words container
          </div>
        </div>
      </div>
    </>
  );
}

export default StoryTimePage;
