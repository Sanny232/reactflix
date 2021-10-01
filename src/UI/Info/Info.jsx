import React from 'react';
import './Info.css';

const Info = ({children, ...restProps}) => {
  return (
    <div className="info" {...restProps}>
      {children}
    </div>
  );
};

export default Info;
