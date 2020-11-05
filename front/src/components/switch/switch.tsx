import React from 'react';
import './switch.css';
import favor from 'assets/favor.svg';

export const Switch = ({ isOn, handleToggle, onColor, tooltip }) => {
  return (
    <div className="switch-container">
      <input
        checked={isOn}
        onChange={handleToggle}
        className="switch-checkbox"
        id={`switch-new`}
        type="checkbox"
      />

      <label
        style={{ background: isOn && onColor }}
        className="switch-label"
        htmlFor={`switch-new`}
        title={tooltip}
      >
        {/* <span className={`switch-button`} style={{backgroundImage:}}> */}

        <img className={`switch-button`} src={favor} alt="switch-heart" />
        {/* </span> */}
      </label>
    </div>
  );
};