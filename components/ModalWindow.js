"use strict";

import React from "react";
import PropTypes from "prop-types";

import "./ModalWindow.sass"

class ModalWindow extends React.Component{

    static propTypes={
        cbShowInfo: PropTypes.func.isRequired,
    }

    closeInfo=()=>{
        this.props.cbShowInfo(false) 
    }

    componentDidMount() {    
        document.body.classList.add('bodyModalWindow');
    }

    componentWillUnmount() {
        document.body.classList.add('bodyModalWindow');
    }

    render(){
        return (
            <div className="modelOverlay">
                <div className="modelWindow">
                    <div className="modelContent">
                        <div className="modelText">
                            Для оформления заказа необходимо заполнить все поля. После оформления заказа наш сотрудник свяжется с Вами по телефону и отправит Вам всю информацию на указанный Email.
                            <p>Спасибо!</p> 
                        </div>
                        <input type="button" value="OK" className="modelButton" onClick = {this.closeInfo}></input>
                    </div>
                </div>
            </div>
        )
    }
}
export default ModalWindow