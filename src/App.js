import React, { useState } from "react";
import "./App.css";
import ModelList from "./components/ModelList";
import ImageGenerator from "./components/ImageGenerator";
import HelloPrompt from "./components/HelloPrompt";
import CodingHelper from "./components/CodingHelper";
import Goals from "./components/Goals";

function App() {
  const [showModelList, setShowModelList] = useState(false);
  const [showImageGenerator, setShowImageGenerator] = useState(false);
  const [activeTab, setActiveTab] = useState("conversations");
  const [activeSubTab, setActiveSubTab] = useState("conversation1");

  return (
    <div className="App">
      <header className="App-header">
        <h1>Eddie Lemons</h1>
      </header>
      <div className="App-content">
        <div className="App-sidebar">
          <button
            className={`App-sidebar-tab ${activeTab === "conversations" ? "active" : ""}`}
            onClick={() => setActiveTab("conversations")}
          >
            Conversations
          </button>
          <button
            className={`App-sidebar-tab ${activeTab === "functions" ? "active" : ""}`}
            onClick={() => setActiveTab("functions")}
          >
            Functions
          </button>
          <button
            className={`App-sidebar-tab ${activeTab === "dreamCatcher" ? "active" : ""}`}
            onClick={() => setActiveTab("dreamCatcher")}
          >
            Dream Catcher
          </button>
          <button
              className={`App-sidebar-tab ${activeTab === "codingHelper" ? "active" : ""}`}
              onClick={() => setActiveTab("codingHelper")}
            >
              Coding Helper
            </button>
          <button 
            className={`App-sidebar-tab ${activeTab === "goals" ? "active" : ""}`}
            onClick={() => setActiveTab("goals")}
            >
            Goals
            </button>
        </div>
        <div className="App-main">
          {activeTab === "conversations" && (
            <>
              <div className="App-subtabs">
                <button
                  className={`App-subtab ${activeSubTab === "conversation1" ? "active" : ""}`}
                  onClick={() => setActiveSubTab("conversation1")}
                >
                  Conversation 1
                </button>
                {/* Add more sub-tabs for conversations here */}
              </div>
              {activeSubTab === "conversation1" && (
                <>
                  <button onClick={() => setShowModelList(!showModelList)}>
                    Toggle Model List
                  </button>
                  {showModelList && <ModelList />}
                  <HelloPrompt />
                </>
              )}
              {/* Add more conversation components here */}
            </>
          )}
          {activeTab === "functions" && (
            <>
              <button onClick={() => setShowImageGenerator(!showImageGenerator)}>
                {showImageGenerator ? "Hide Image Generator" : "Show Image Generator"}
              </button>
              {showImageGenerator && <ImageGenerator />}
            </>
          )}

          {activeTab === "codingHelper" && <CodingHelper />}
          {activeTab === "goals" && <Goals />}

        </div>
      </div>
    </div>
  );
}

export default App;
