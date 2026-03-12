import React from 'react';

const SimpleButton = ({ title, onClick, ...props }) => {
  console.log(onClick);
  return (
    <button {...props} onClick={onClick}>
      {title}
    </button>
  );
};

export default SimpleButton;
