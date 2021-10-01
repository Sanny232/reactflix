import React from 'react';
import { useDispatch } from 'react-redux';
import { setGenres, setStatus } from '../../store/showsSlice';

const Filters = ({ status, genres }) => {
	const dispatch = useDispatch();
	return (
		<div>
			<select
				value={genres[0]}
				onChange={(e) => dispatch(setGenres([e.target.value]))}
			>
				<option value="any">All genres</option>
				<option value="Food">Food</option>
				<option value="Action">Action</option>
				<option value="Drama">Drama</option>
				<option value="Comedy">Comedy</option>
				<option value="Horror">Horror</option>
			</select>
			<select
				value={status}
				onChange={(e) => dispatch(setStatus(e.target.value))}
			>
				<option value="any">All statuses</option>
				<option value="Ended">Ended</option>
				<option value="Running">Running</option>
			</select>
		</div>
	);
};

export default Filters;
