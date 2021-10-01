import './App.css';
import Login from './components/Login/Login';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Menu from './components/Menu/Menu';
import React, {useEffect} from 'react';
import Shows from './components/Shows/Shows';
import {useDispatch} from 'react-redux';
import {setLoading, updateAuth} from "./store/userSlice";
import Friends from "./components/Friends/Friends";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Favorites from "./components/Favorites/Favorites";
import Register from "./components/Register/Register";
import Profile from "./components/Profile/Profile";

function App() {
	const dispatch = useDispatch();
	useEffect(() => {
		const token = localStorage.getItem('token');
		if(token){
			dispatch(updateAuth(token))
		}
		else{
			dispatch(setLoading(false))
		}
	}, [dispatch])

	return (
		<div className="app">
			<Router>
				<Menu />
				<div className="content">
					<Switch>
						<ProtectedRoute exact path="/social" component={Friends}/>
						<ProtectedRoute exact path="/favorites" component={Favorites}/>
						<ProtectedRoute exact path="/profile" component={Profile}/>
						<Route path="/register" component={Register}/>
						<Route path="/shows" component={Shows}/>
						<Route path="/"><Redirect to="/shows"/></Route>
					</Switch>
				</div>
			</Router>
		</div>
	);
}

export default App;
