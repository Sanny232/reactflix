import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import ShowCard from "../ShowCard/ShowCard";
import {useHistory} from "react-router-dom";
import {getFavShows} from "../../store/showsSlice";
import Loader from "../../UI/Loader/Loader";

const Favorites = () => {
  const {favorites, loading} = useSelector(state => state.shows);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFavShows())
  }, [dispatch])
  const history = useHistory();
  return (
    <div>
      <h1>Favorites</h1>
        <div className="showsWrapper">
          {loading && <Loader/>}
          {favorites && !loading && favorites.map(el => <ShowCard show={el} fav={false} handleClick={() => history.push(`/shows/${el.id}`)}/>)}
          {favorites.length < 1 && !loading && 'No data'}
        </div>
    </div>
  );
};

export default Favorites;
