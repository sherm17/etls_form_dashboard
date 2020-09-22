import React from "react";

const Button = ({isDisabled, handleClick, children, className}) => {
  return (
    <button
      type="submit"
      disabled={isDisabled}
      onClick={handleClick}
      className={className}
    >
      {children}
    </button>
  )
}

export default Button;