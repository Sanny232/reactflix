import React, {useEffect} from "react";
import { Route } from "react-router-dom";
import Login from "../Login/Login";
import {useSelector} from "react-redux";
import Loader from "../../UI/Loader/Loader";

function ProtectedRoute({ component: Component, ...restOfProps }) {
  const user = useSelector(state => state.user.nickname);
  const loading = useSelector(state => state.user.loading);

  const getComponent = (props) => {
    if(loading) return <Loader/>
    if(user) return <Component {...props} />
    return <Login/>
  }
  return (
    <Route
      {...restOfProps}
      render={(props) =>
        getComponent(props)
      }
    />
  );
}

export default ProtectedRoute;
