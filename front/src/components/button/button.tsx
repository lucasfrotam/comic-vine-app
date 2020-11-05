import React from 'react';
import './button.css';


export const Button = (props) => {
  return (
    <button className={`button ${props.className}`} onClick={props.onClick}>{props.title}</button>
  );
};