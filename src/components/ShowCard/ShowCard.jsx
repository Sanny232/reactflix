import React from 'react';
import './ShowCard.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const ShowCard = ({ show, handleClick, fav }) => {
	return (
		<div
			onClick={() => handleClick(show.id)}
			key={show.id}
			className="showsItem"
		>
			<div className="showsImageWrapper">
					<LazyLoadImage src={show.image.medium}/>
			</div>
			<p>{fav && 'In favorites'}</p>
			<h3>{show.name}</h3>
		</div>
	);
};

export default ShowCard;
