import React from 'react';
import './ButtonCommon.css';

const ButtonCommon = (props) => {
  const {color='#47f71c', children, ...restProps} = props;
  return (
    <button {...restProps} className="button" style={{backgroundColor: color}}>
      {children}
    </button>
  );
};

export default ButtonCommon;
