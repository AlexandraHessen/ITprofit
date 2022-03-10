"use strict";

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import Contacts from '../components/Contacts.js'
import MenuPages from '../pages/MenuPages';
import BasketShowCount from './BasketShowCount';
import './Header.css';


class Header extends React.Component{

    render(){
        return(
            <header className="Header">
                <div className="Info">
                    <div className="Logo">
                        <span>Plants</span>
                        <img src="/img/logo.png" className="ImgLogo"></img>
                    </div>
                    <div className='Contacts'>
                        <Contacts />
                    </div>
                    <BasketShowCount />
                </div>
                <div className="Navigation">
                    <MenuPages />
                </div>
            </header>
        )
    }
}

export default Header