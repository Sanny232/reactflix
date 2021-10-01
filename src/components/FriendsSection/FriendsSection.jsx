import React from 'react';
import InfoItem from "../../UI/Info/InfoItem/InfoItem";
import Info from "../../UI/Info/Info";
import {useDispatch} from "react-redux";
import {removeFriend} from "../../store/friendsSlice";
import ButtonCommon from "../../UI/ButtonCommon/ButtonCommon";

const FriendsSection = ({friends}) => {
  const dispatch = useDispatch();
  return (
    <Info style={{maxWidth: "400px"}}>
      <h2>Friends</h2>
      {friends.length > 0 ? friends.map(el => <InfoItem style={{display: "flex"}}>{el.username}
        <div style={{flex: 1}}/>
        <ButtonCommon onClick={() => dispatch(removeFriend(el._id))}>Remove</ButtonCommon>
      </InfoItem>) : 'You have no friends'}
    </Info>
  );
};

export default FriendsSection;
