import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import InfoItem from "../../UI/Info/InfoItem/InfoItem";
import Info from "../../UI/Info/Info";
import ButtonCommon from "../../UI/ButtonCommon/ButtonCommon";
import {setCurrentUser} from "../../store/userSlice";

const Profile = () => {
  const {nickname, email, age} = useSelector(state => state.user);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Profile</h1>
      <Info style={{maxWidth: "500px"}}>
        <InfoItem>Username: {nickname}</InfoItem>
        <InfoItem>Email: {email}</InfoItem>
        <InfoItem>Age: {age}</InfoItem>
      </Info>
      <ButtonCommon onClick={() => dispatch(setCurrentUser({}))}>Log out</ButtonCommon>
    </div>
  );
};

export default Profile;
