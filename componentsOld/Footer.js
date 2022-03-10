import React from 'react';

import MenuPages from '../pages/MenuPages';
import CategoryMenu from './CategoryMenu';
import Contacts from './Contacts'

import './Footer.css'

class Footer extends React.PureComponent {
    // React.PureComponent
    render(){
        return(
            <footer className="Footer">
                <div className="Menu">
                    <h3>Меню</h3>
                    <MenuPages />
                </div>
                <div>
                    <h3>Контакты</h3>
                    <Contacts />
                </div>
            </footer>
        )
    }

}

export default Footer;