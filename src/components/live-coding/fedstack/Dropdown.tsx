import React from 'react';

const Dropdown = ({
  onChange,
  array,
}: {
  onChange: (e: any) => void;
  array: string[];
}) => {
  return (
    <select onChange={onChange}>
      {array.map((elem) => (
        <option key={elem}>{elem}</option>
      ))}
    </select>
  );
};

export default Dropdown;
