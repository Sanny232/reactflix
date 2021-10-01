import React, {useEffect} from 'react';
import {Link, useHistory, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchEpisode, setEpisode, setLoading} from "../../store/showInfoSlice";
import Info from "../../UI/Info/Info";
import InfoItem from "../../UI/Info/InfoItem/InfoItem";
import Loader from "../../UI/Loader/Loader";
import './EpisodePage.css';
import ErrorInfo from "../../UI/ErrorInfo/ErrorInfo";

const EpisodePage = () => {
  const {id, season, number} = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const episode = useSelector(state => state.showInfo.currentEpisode);
  const {loading} = useSelector(state => state.showInfo);
  const authChecking = useSelector(state => state.user.loading);
  const {nickname} = useSelector(state => state.user);

  useEffect(() => {
    dispatch(setLoading(true));
    dispatch(fetchEpisode({id, season, number}))
      .unwrap()
      .catch(() => history.push(`/shows/${id}`))
    return () => dispatch(setEpisode({}))
  }, [id, history, dispatch, number, season])

  return (
    <div>
      {loading && <Loader/>}
      {!loading && !authChecking && (<>
        <Info>
            <InfoItem><h2>{episode.name}</h2></InfoItem>
            <InfoItem><Link to={`/shows/${id}`}>Season {season}</Link> / Number {number}</InfoItem>
            <InfoItem><p dangerouslySetInnerHTML={{__html: episode.summary}}/></InfoItem>
          <div className="imgWrapper"><img src={episode?.image?.medium} alt=""/></div>
        </Info>
        <h1>Watch episode</h1>
        <p>{nickname ? <div>
          <iframe width="560" height="315" src="https://react-flix-ff.herokuapp.com/video"
                  frameBorder="0"
                  allow="clipboard-write; encrypted-media;"
                  allowFullScreen>
          </iframe>
        </div> : <ErrorInfo>Video available only for authorized users!</ErrorInfo>}</p>
      </>)}
    </div>
  )
}
;

export default EpisodePage;
