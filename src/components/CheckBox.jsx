/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useRef, useEffect } from 'react';

const CheckBox = ({ initialChecked, label, onChange }) => {
  const id = useRef(
    Math.random().toString(36).substring(2, 5) + Math.random().toString(36).substring(2, 5),
  );
  const [isChecked, setIsChecked] = useState(initialChecked);

  useEffect(() => {
    onChange(isChecked);
  }, [isChecked, onChange]);

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
          data-testid="checkbox"
        />
      </label>
    </div>
  );
};

export default CheckBox;
