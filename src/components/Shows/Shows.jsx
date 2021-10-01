import React, { useEffect } from 'react';
import './Shows.css';
import { Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';
import ShowPage from '../ShowPage/ShowPage';
import Filters from '../Filters/Filters';
import ShowCard from '../ShowCard/ShowCard';
import { useDispatch, useSelector } from 'react-redux';

import {fetchShows, getFavShows, setShows} from '../../store/showsSlice';
import EpisodePage from "../EpisodePage/EpisodePage";
import Loader from "../../UI/Loader/Loader";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

const Shows = () => {
	const history = useHistory();
	const shows = useSelector((state) => state.shows.shows);
	const genres = useSelector((state) => state.shows.genres);
	const status = useSelector((state) => state.shows.status);
	const loading = useSelector((state) => state.shows.loading);
	const error = useSelector((state) => state.shows.error);
	const favorites = useSelector((state) => state.shows.favorites);
	const nickname = useSelector((state) => state.user.nickname);
	const dispatch = useDispatch();
	const { path } = useRouteMatch();

	useEffect(() => {
		dispatch(fetchShows({ genres, status }));
		dispatch(getFavShows());
		return () => {dispatch(setShows([]))}
	}, [genres, status, dispatch]);
	return (
		<div>
			<Switch>
				<Route exact path={path}>
					<h1>Shows</h1>
					<Filters status={status} genres={genres} />
					<div className="showsWrapper">
						{error && <div><p>Something went wrong... </p>
							<button onClick={() => dispatch(fetchShows({ genres, status }))}>Retry?</button>
						</div>}
						{loading
							? <Loader/>
							: shows.map((show) => (
									<ShowCard
										show={show}
										key={show.id}
										handleClick={() => history.push(`/shows/${show.id}`)}
										fav={favorites.some(el => el.id === show.id) && nickname}
									/>
							  ))}
					</div>
				</Route>
				<Route path={`${path}/:id/episodes/:season/:number`} component={EpisodePage}/>
				<Route exact path={`${path}/:id`}>
					<ShowPage/>
				</Route>
			</Switch>
		</div>
	);
};

export default Shows;
