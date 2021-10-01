import React from 'react';
import './ErrorInfo.css';

const ErrorInfo = ({children, ...restProps}) => {
  return (
    <div className="errorInfo" {...restProps}>
      {children}
    </div>
  );
};

export default ErrorInfo;
