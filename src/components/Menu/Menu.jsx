import React from 'react';
import { VscAccount } from 'react-icons/vsc';
import { VscVmRunning } from 'react-icons/vsc';
import './Menu.css';
import { NavLink } from 'react-router-dom';
import {useSelector} from 'react-redux';
import {AiFillHeart, AiOutlineUsergroupAdd} from "react-icons/all";

const Menu = () => {
	const user = useSelector((state) => state.user.nickname);

	return (
		<div className="menu">
			{user}
			<NavLink to={'/profile'} activeClassName="selected" className="menuItem">
				<VscAccount size={40} />
			</NavLink>
			<NavLink to={'/social'} activeClassName="selected" className="menuItem">
				<AiOutlineUsergroupAdd size={40} />
			</NavLink>
			<NavLink to={'/shows'} activeClassName="selected" className="menuItem">
				<VscVmRunning size={40} />
			</NavLink>
			<NavLink to={'/favorites'} activeClassName="selected" className="menuItem">
				<AiFillHeart size={40}/>
			</NavLink>
		</div>
	);
};

export default Menu;
