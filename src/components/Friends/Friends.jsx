import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {loadFriends} from "../../store/friendsSlice";
import FriendsSection from "../FriendsSection/FriendsSection";
import Requests from "../RequestsSection/Requests";
import FriendsSearch from "../FriendsSearch/FriendsSearch";

const Friends = () => {
  const dispatch = useDispatch();
  const friends = useSelector(state => state.friends.friends);

  useEffect(() => {
    dispatch(loadFriends())
  }, [dispatch])
  return (
    <div>
      <FriendsSection friends={friends}/>
      <Requests/>
      <FriendsSearch/>
    </div>
  );
};

export default Friends;
