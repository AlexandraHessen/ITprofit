import React from 'react';
import { NavLink } from 'react-router-dom';

import './CategoryMenu.css'

class CategoryMenu extends React.Component{
    // нельзя pure componenet
    render(){
        return (
            <ul className="CategoryMenu">
                <li><NavLink to="/catalog/deciduous">Лиственные растения</NavLink></li>
                <li><NavLink to="/catalog/blooming">Цветущие растения</NavLink></li>
                <li><NavLink to="/catalog/succulents">Кактусы и суккуленты</NavLink></li>
                <li><NavLink to="/catalog/vines">Лианы</NavLink></li>
                <li><NavLink to="/catalog/fruit">Плодовые растения</NavLink></li>
            </ul>
        )
    }
}

export default CategoryMenu;