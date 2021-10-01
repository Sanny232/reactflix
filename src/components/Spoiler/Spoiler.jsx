import React from 'react';
import { VscTriangleDown } from 'react-icons/vsc';
import './Spoiler.css';
const Spoiler = ({ title, children, opened, setActive }) => {
	return (
		<div>
			<h2 onClick={() => setActive()} className="title">
				{title}
				<VscTriangleDown size={20} className={opened ? 'rotated' : 'normal'} />
			</h2>
			<div className={'spoiler-content ' + (opened ? 'visible' : 'hidden')}>
				{children}
			</div>
		</div>
	);
};

export default Spoiler;
