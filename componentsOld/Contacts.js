import React from 'react';

import './Contacts.css';

class Contacts extends React.Component{
    render(){
        return (
            <ul className="Contacts">
                <li>+375 (29) 844-44-88</li>
                <li>+375 (44) 888-44-88</li>
                <li>Пн-Пт: 9:00-18:00</li>
                <li>г.Минск, пр.Победителей, 65</li>
            </ul>
        )
    }
}

export default Contacts;