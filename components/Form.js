"use strict";

import React from "react";
import PropTypes from "prop-types";
import InputMask from "react-input-mask";
import isoFetch from "isomorphic-fetch";

import { checkNameValue, checkEmailValue, checkTelValue, checkMessageValue  } from "../services/checkForm";

import "./Form.scss"

class Form extends React.Component{
    state={
        name: "",
        email: "",
        phone: "",
        message: "",

        errorName: 0, //0-нет ошибки, 1-пустое значение, 2-неверное значение
        errorEmail: 0, //0-нет ошибки, 1-нет ошибки (email не обязателен), 2-неверное значение
        errorPhone: 0, //0-нет ошибки, 1-пустое значение, 2-неверное значение
        errorMessage: 0, //0-нет ошибки, 1-пустое значение, 2-неверное значение

        emptyValueError: "* Поле обязательно для заполнения!",
        emailError: "* Некорректный E-mail!",
    }

    changeName = (e)=> {
        this.setState( {name: e.target.value, errorName: 0} );
    };
    checkName = () => {
        let check = checkNameValue(this.state.name);
        this.setState( {errorName: check} );
        return check;
    };

    changeEmail = (e)=> {
        this.setState( {email: e.target.value, errorEmail: 0} );
    };
    checkEmail = () => {
        let check = checkEmailValue(this.state.email);
        this.setState( {errorEmail: check} );
        return check;
    };
    
    changeTel = (e)=> {
        this.setState( {phone: e.target.value, errorPhone: 0} );
    };

    checkTel = () => {
        let telValue=(this.state.phone==="+375 (__) ___-__-__")?"":this.state.phone
        let check = checkTelValue(telValue);
        this.setState( {errorPhone: check} );
        return check;
    };

    changeMessage = (e)=> {
        this.setState( {message: e.target.value, errorMessage: 0} );
    };
    checkMessage = () => {
        let check = checkMessageValue(this.state.message);
        this.setState( {errorMessage: check} );
        return check;
    };

    checkForm = (e) => {
        let checkNameBeforeSend = this.checkName();
        let checkEmailBeforeSend = this.checkEmail();
        let checkTelBeforeSend = this.checkTel();
        let checkMessageBeforeSend = this.checkMessage();

        if(  checkNameBeforeSend!==0  
            || checkEmailBeforeSend!==0
            || checkTelBeforeSend!==0
            || checkMessageBeforeSend!==0) {
            e.preventDefault();
        }
        else{
            this.addOrder()
        }
    }

    addOrder=()=>{
        let info={        
            name: this.state.name,
            email: this.state.email,
            phone: this.state.phone,
            message: this.state.message,
        };
        
        let password=Math.random();

        let sp1 = new URLSearchParams();
        sp1.append("f", "LOCKGET");
        sp1.append("n", "YAKOVLEVA_FORM_ITPROFIT");
        // проверка сохранения order через Ajax http://fe.it-academy.by/Examples/AJAXStringStorageReader.html
        // Имя строки: YAKOVLEVA_FORM_ITPROFIT
        sp1.append("p", password);
        isoFetch("http://fe.it-academy.by/AjaxStringStorage2.php", { // отправляем AJAX запрос
            method: "POST",
            headers: {
                "Accept": "application/json",
            },
            body: sp1,
        })
                        // isoFetch - работает с промисами
                        // запросить json по ссылке
                        // когда будет решен промис выполнить .then...
            .then( (response) => { // response - HTTP-ответ
                if (!response.ok) {
                    let Err=new Error("fetch error " + response.status);
                    Err.userMessage="Ошибка связи";
                    throw Err;
                }
                else
                    return response.json();
            })
            .then( (data) => { //когда данные хорошо загружены
                this.lockGetReady(data, info, password);
            })
            .catch( (error) => {
                console.error(error);
            });
            this.clearCart();
            alert("Заказ сформирован!");

    }



    lockGetReady = (callresult, info, password) => {
        let allInfoOrder=[]
        if ( callresult.error!=undefined )
            alert(callresult.error);
        else {
            allInfoOrder=[];
            if ( callresult.result!="" ) { // либо строка пустая - сообщений нет
                // либо в строке - JSON-представление массива сообщений
                allInfoOrder=JSON.parse(callresult.result);
                // вдруг кто-то сохранил мусор 
                if ( !Array.isArray(allInfoOrder) )
                allInfoOrder=[];
            }
    // ----------------------- ДОБАВЛЯЕМ НАШИ НОВЫЕ ДАННЫЕ  ----------------------- //
            allInfoOrder.push( { customer: info.email , data: info } );
    
    // ----------------------- ДОБАВЛЯЕМ НАШИ ДАННЫЕ К УЖЕ ИМЕЮЩИМСЯ----------------------- //
    // и сохраняем их на сервере и отпираем их, чтобы они уже были доступны
            let sp2 = new URLSearchParams();
            sp2.append("f", "UPDATE");
            sp2.append("n", "YAKOVLEVA_FORM_ITPROFIT");
            sp2.append("v", JSON.stringify(allInfoOrder));
            sp2.append("p", password);
            isoFetch("http://fe.it-academy.by/AjaxStringStorage2.php", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                },
                body: sp2,
            })
              .then( (response) => { // response - HTTP-ответ
                    if (!response.ok) {
                        let Err=new Error("fetch error " + response.status);
                        Err.userMessage="Ошибка связи";
                        throw Err;
                    }
                    else{ 
                        return response.json();}
                })
                .catch( (error) => {
                    console.error(error);
                });
        }


    }

    clearCart=()=>{
        console.log(this.state.email)
        this.setState( {name: "", email: "", phone: "", message: "" } );
        console.log(this.state.email)
    }

    render(){
        return(
            <div className="Order">
                <h1>Оформление заказа:</h1>
                <div>
                    <label htmlFor="name" className="LabelOrder">Имя</label>
                    <input type="text" name="name" value={this.state.name} className={(this.state.errorName==0)?"InputOrder":"InputOrder ErrorInputOrder"} onChange = {this.changeName} onBlur = {this.checkName}></input>
                    <span className = {this.state.errorName == 1 ? "visible" : "invisible"}>{this.state.emptyValueError}</span>
                </div>
                <div>
                    <label htmlFor="email" className="LabelOrder">Email</label>
                    <input type="email" name="email" value={this.state.email} className={(this.state.errorEmail==0)?"InputOrder":"InputOrder ErrorInputOrder"} placeholder="email@gmail.com" onChange = {this.changeEmail} onBlur = {this.checkEmail}></input>
                    <span className = {this.state.errorEmail == 1 ? "visible" : "invisible"}>{this.state.emptyValueError}</span>
                    <span className = {this.state.errorEmail == 2 ? "visible" : "invisible"}>{this.state.emailError}</span>
                </div>
                <div>
                    <label htmlFor="phone" className="LabelOrder">Телефон</label>
                    <InputMask {...this.props} mask="+375 (99) 999-99-99" type="text" name="phone" value={this.state.phone} className={(this.state.errorPhone==0)?"InputOrder":"InputOrder ErrorInputOrder"} onChange = {this.changeTel} onBlur = {this.checkTel}></InputMask>
                    <span className = {this.state.errorPhone == 1 ? "visible" : "invisible"}> {this.state.emptyValueError}</span>
                </div>
                <div>
                    <label htmlFor="message" className="LabelOrder">Сообщение</label>
                    <textarea name="message" value={this.state.message} className={(this.state.errorMessage==0)?"TextareaOrder":"TextareaOrder ErrorTextareaOrder"} onChange = {this.changeMessage} onBlur = {this.checkMessage}></textarea>
                    <span className = {this.state.errorMessage == 1 ? "visible" : "invisible"}> {this.state.emptyValueError}</span>
                </div>
                <input type="button" value="Оформить заказ" className="CheckoutButton" onClick = {this.checkForm} disabled={this.state.notValidForm}></input>

            </div>
        )
    }
}
export default Form;

