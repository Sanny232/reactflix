import React from 'react';
import './InfoItem.css';

const InfoItem = ({children, ...restProps}) => {
  return (
    <div className="infoItem" {...restProps}>
      {children}
    </div>
  );
};

export default InfoItem;
