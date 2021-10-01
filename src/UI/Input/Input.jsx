import React from 'react';
import './Input.css';

const Input = ({ name, errors, register, type = 'text', children }) => {
	return (
		<div className="inputField">
			<input
				type={type}
				name={name}
				id={name}
				placeholder={children}
				{...register(name, { required: true })}
			/>
			<label htmlFor="login">{children}</label>
			{errors[name] && <span className="error">{children} is required</span>}
		</div>
	);
};

export default Input;
