import React, { useEffect } from 'react';
import {Link, useHistory, useParams, useRouteMatch} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './ShowPage.css';
import {
	fetchShowByID,
	setActiveSeason,
	setInfo,
	setLoading,
} from '../../store/showInfoSlice';
import Spoiler from '../Spoiler/Spoiler';
import { formatSeasons } from '../../lib/formatSeasons';
import Loader from "../../UI/Loader/Loader";
import Info from "../../UI/Info/Info";
import InfoItem from "../../UI/Info/InfoItem/InfoItem";
import {addShowToFav, getFavShows, removeShowFromFav} from "../../store/showsSlice";
import ButtonCommon from "../../UI/ButtonCommon/ButtonCommon";
import {AiFillHeart} from "react-icons/all";
import ErrorInfo from "../../UI/ErrorInfo/ErrorInfo";

const ShowPage = () => {
	const { info, loading, error, activeSeason } = useSelector(
		(state) => state.showInfo
	);
	const {favorites} = useSelector(state => state.shows);
	const {nickname} = useSelector(state => state.user);
	const dispatch = useDispatch();
	const { id } = useParams();
	const history = useHistory();

	useEffect(() => {
		dispatch(setLoading(true));
		nickname && dispatch(getFavShows());
		dispatch(fetchShowByID(id))
			.unwrap()
			.catch(() => history.push('/shows'))
			.finally(() => dispatch(setLoading(false)));
		return () => {
			dispatch(setInfo(null))
		}
	}, [id, dispatch, history]);
	const favStatus = () => {
		if(!nickname) return <ErrorInfo>Please sign in to add to favorites</ErrorInfo>
		if (favorites.some(el => el.id == id)) {
			return <ButtonCommon color="red"
			onClick={() => dispatch(removeShowFromFav(id))}
			>Unlike <AiFillHeart size={15}/></ButtonCommon>;
		}
		return <ButtonCommon onClick={() => dispatch(addShowToFav({"showId": id}))}>Like <AiFillHeart size={15}/></ButtonCommon>
	}

	return (
		<div>
			{loading && <Loader/>}
			{!loading && info && (
				<>
					<Info>
						<InfoItem><h2>{info.name}</h2></InfoItem>
						<InfoItem>Genres: {info.genres && info.genres.join(', ')}</InfoItem>
						<InfoItem><p dangerouslySetInnerHTML={{ __html: info.summary }}/></InfoItem>
						{favStatus()}
					</Info>
					<img src={info.image?.medium} alt="" className="image"/>
					<h1>Episodes</h1>
					{info._embedded &&
						formatSeasons(info._embedded.episodes).map((el) => (
							<Spoiler
								title={'Season ' + el.season}
								opened={activeSeason == el.season}
								setActive={() =>
									activeSeason !== el.season
										? dispatch(setActiveSeason(el.season))
										: dispatch(setActiveSeason(0))
								}
							>
								{el.episodes.map((ep) => (
									<div key={ep.id}>
										<Link to={`${id}/episodes/${ep.season}/${ep.number}`} className="link">No {ep.number} | {ep.name}</Link>
									</div>
								))}
							</Spoiler>
						))}
				</>
			)}
		</div>
	);
};

export default ShowPage;
