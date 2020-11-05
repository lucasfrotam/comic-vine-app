import React from 'react';
import './body.css';

export const Body = (props) => {
  return (
    <div className='body' ref={props.reference}>
      {props.children}
    </div>
  );
}