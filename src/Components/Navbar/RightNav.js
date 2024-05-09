import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../helpers/AuthContext";

const RightNav = ({ open, toggleDropdown }) => {
  const { authState, setAuthState } = useContext(AuthContext);

  return (
    <div className={`navbar ${open ? "open" : ""}`}>
      <div className="navbar-items-container">
        <Link id="navbar-home" to="/" onClick={toggleDropdown}>
          Home
        </Link>
        {authState && (
          <>
            <Link
              className="navbar-item"
              to="/flashcards"
              onClick={toggleDropdown}
            >
              Flashcards
            </Link>
            <Link
              className="navbar-item"
              to="/gpt-response"
              onClick={toggleDropdown}
            >
              Story Time
            </Link>
          </>
        )}
        {!authState && (
          <>
            <Link
              className="navbar-item"
              to="/register"
              onClick={toggleDropdown}
            >
              Register
            </Link>
            <Link className="navbar-item" to="/login" onClick={toggleDropdown}>
              Login
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default RightNav;
