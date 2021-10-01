import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {answerToRequest, loadRequests} from "../../store/friendsSlice";
import InfoItem from "../../UI/Info/InfoItem/InfoItem";
import Info from "../../UI/Info/Info";
import ButtonCommon from "../../UI/ButtonCommon/ButtonCommon";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector(state => state.friends.requests);
  useEffect(() => {
    dispatch(loadRequests())
  }, [dispatch])

  return (
    <div>
      {requests.length > 0 && (<Info style={{maxWidth: "400px"}}>
        <h2>Requests</h2>
        { requests.map(el => (<InfoItem style={{display: "flex", flexWrap: "wrap"}}>{el.senderUsername}
          <div style={{flex: 1}}/>
          <div>
            <ButtonCommon onClick={() => dispatch(answerToRequest({id: el._id, answer: 'accept'}))}>Accept</ButtonCommon>
            <ButtonCommon onClick={() => dispatch(answerToRequest({id: el._id, answer: 'reject'}))}>Decline</ButtonCommon>
          </div>
        </InfoItem>)) }
      </Info>)}
    </div>
  );
};

export default Requests;
