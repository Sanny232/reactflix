import React from 'react';
import './Form.css';

const Form = ({ title, children, submitHandle }) => {
	return (
		<form className="form" onSubmit={submitHandle}>
			<p className="formInfo">{title}</p>
			{children}
		</form>
	);
};

export default Form;
