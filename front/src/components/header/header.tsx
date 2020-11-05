import React from 'react';
import './header.css';

export const Header = (props) => {
  return (
    <div className='header-bar'>
      {props.children}
    </div>
  );
}