import React from 'react';
import './Login.css';
import Form from '../../UI/Form/Form';
import { useForm } from 'react-hook-form';
import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';
import {login} from '../../store/userSlice';
import { useDispatch } from 'react-redux';
import {Link} from "react-router-dom";

const Login = () => {
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm();
	const dispatch = useDispatch();

	function onSubmit(data) {
		dispatch(login(data))
	}
	return (
		<div className="login">
			<Form title="Login" submitHandle={handleSubmit(onSubmit)}>
				<Input type="text" name="email" errors={errors} register={register}>
					Email
				</Input>
				<Input
					type="password"
					name="password"
					errors={errors}
					register={register}
				>
					Password
				</Input>
				<Button>Login</Button>
				<Link to="/register">Registration</Link>
			</Form>
		</div>
	);
};

export default Login;
