import React from "react";
import { Link } from "react-router-dom";
const Error = () => {
  return (
    <div className="error">
      <h1 className="error-h1">404</h1>
      <p className="error-p">Oops! Something is wrong.</p>
      <Link className="error-button" to="/">
        Go back in initial page, is better.
      </Link>
    </div>
  );
};

export default Error;
