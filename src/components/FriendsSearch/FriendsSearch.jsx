import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {findNewFriends, sendRequest} from "../../store/friendsSlice";
import InfoItem from "../../UI/Info/InfoItem/InfoItem";
import Info from "../../UI/Info/Info";
import ButtonCommon from "../../UI/ButtonCommon/ButtonCommon";

const FriendsSearch = () => {
  const dispatch = useDispatch();
  const possibleFriends = useSelector(state => state.friends.possibleFriends);
  useEffect(() => {
    dispatch(findNewFriends());
  }, [dispatch])

  return (
    <Info style={{maxWidth: "400px"}}>
      <h2>Possible friends</h2>
      {possibleFriends && possibleFriends.map(el => <InfoItem style={{display: "flex"}} key={el.id}>{el.username}
        <div style={{flex: 1}}/>
        <ButtonCommon onClick={() => dispatch(sendRequest(el._id))}>Send request</ButtonCommon>
      </InfoItem>)}
    </Info>
  );
};

export default FriendsSearch;
