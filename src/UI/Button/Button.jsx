import React from 'react';
import './Button.css';

const Button = ({ children, ...restProps }) => {
	return (
		<button className="submitBtn" {...restProps}>
			{children}
		</button>
	);
};

export default Button;
