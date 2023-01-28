import React from "react";

const ErrorMessage = (props) => {
  return (
    <ul className={`error-container ${props.className}`}>
      <li>{props.children}</li>
    </ul>
  );
};

export default ErrorMessage;
