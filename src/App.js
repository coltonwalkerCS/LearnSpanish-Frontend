import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthContext } from "./helpers/AuthContext";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Pages/Home";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import FlashcardPage from "./Pages/FlashcardPage";
import PracticeCollection from "./Pages/PracticeCollection";
import CreateCollection from "./Pages/CreateCollection";
import StoryTimePage from "./Pages/StoryTimePage";

function App() {
  const [authState, setAuthState] = useState(
    !!localStorage.getItem("accessToken")
  );

  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/flashcards" element={<FlashcardPage />} />
            <Route path="/create-collection" element={<CreateCollection />} />
            <Route path="/gpt-response" element={<StoryTimePage />} />
            <Route
              path="/practice-collection"
              element={<PracticeCollection />}
            />
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
