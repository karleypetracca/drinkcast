/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useRef, useEffect } from 'react';

const CheckBox = ({ initalChecked, label, onChange }) => {
  const id = useRef(
    Math.random().toString(36).substring(2, 5) + Math.random().toString(36).substring(2, 5),
  );
  const [isChecked, setIsChecked] = useState(initalChecked);

  useEffect(() => {
    onChange(isChecked);
  }, [isChecked]);

  const handleChange = (e) => {
    setIsChecked(e.target.checked);
  };

  return (
    <div>
      <label>
        {label}
        <input
          type="checkbox"
          checked={isChecked}
          id={id}
          onChange={(e) => handleChange(e)}
        />
      </label>
    </div>
  );
};

export default CheckBox;
