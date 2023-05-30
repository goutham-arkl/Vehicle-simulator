import React from 'react';
import './Content.css';

const Content = (props) => {
  const RenComponent = props.ren;

  return (
    <div className="content-container">
      <RenComponent />
    </div>
  );
};

export default Content;

