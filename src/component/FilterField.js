import React, { useState } from 'react';

const FilterField = ({ name='name', value=false, onChange=()=>{} }) => {
  const [currentState, setCurrentState] = useState(value);
  const ASC_TICK = String.fromCharCode(0x2713);
  const ASC_CROSS = String.fromCharCode(0x2717);

  const onToggle = () => {
    const newState = !currentState;
    setCurrentState(newState);
    onChange(newState);
  }

  return (
    <div
      className={`block bg-${
        currentState ? 'green' : 'red'
      }-400 py-2 pl-2 pr-4 cursor-pointer select-none m-1`}
      onClick={onToggle}
    >
      <span className="font-bold pr-2">
        {currentState ? ASC_TICK : ASC_CROSS}
      </span>
      {name}
    </div>
  );
};

export default FilterField;
