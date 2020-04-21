/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useRef } from 'react';

const CheckBox = ({ initalChecked, label }) => {
  const id = useRef(
    Math.random().toString(36).substring(2, 5) + Math.random().toString(36).substring(2, 5),
  );
  const [isChecked, setIsChecked] = useState(initalChecked);

  return (
    <div>
      <label>
        {label}
        <input
          type="checkbox"
          checked={isChecked}
          id={id}
          onChange={setIsChecked}
        />
      </label>
    </div>
  );
};

export default CheckBox;
