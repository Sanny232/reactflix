import React from 'react';
import Form from "../../UI/Form/Form";
import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";
import {Link, useHistory} from "react-router-dom";
import {registration} from '../../store/userSlice';
import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import './Register.css';

const Register = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const dispatch = useDispatch();
  const history = useHistory();
  function onSubmit(data) {
    dispatch(registration(data))
      .unwrap()
      .then(() => history.push('/social'))
      .catch(err => alert(err))
  }

  return (
    <div className="register">
      <Form title="Register" submitHandle={handleSubmit(onSubmit)}>
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
        <Input type="text" name="age" errors={errors} register={register}>
          Age
        </Input>
        <Input type="text" name="username" errors={errors} register={register}>
          Username
        </Input>
        <Button>Register</Button>
        <Link to="/login">Login</Link>
      </Form>
    </div>
  );
};

export default Register;
