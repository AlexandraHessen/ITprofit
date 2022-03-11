"use strict";

import React from 'react';
import PropTypes from 'prop-types';
import InputMask from 'react-input-mask';

import { checkNameValue, checkEmailValue, checkTelValue, checkMessageValue  } from '../services/checkForm';

import './Form.css'

class Form extends React.Component{
    state={
        name: '',
        email: '',
        tel: '',
        message: '',

        // nameNotValid: false,    // когда ошибка = true отображается  <span> с ошибкой  (логич выражение) && JSX
        // telNotValid: false,
        // emailNotValid: false,


        errorName: 0, //0-нет ошибки, 1-пустое значение, 2-неверное значение
        errorEmail: 0, //0-нет ошибки, 1-нет ошибки (email не обязателен), 2-неверное значение
        errorTel: 0, //0-нет ошибки, 1-пустое значение, 2-неверное значение
        errorMessage: 0, //0-нет ошибки, 1-пустое значение, 2-неверное значение

        // notValidForm: false, // когда вся форма не валидна = true, т.к. buttonSave должен быть disabled= true

        emptyValueError: '* Поле обязательно для заполнения!',
        emailError: '* Некорректный E-mail!',

        // nameError: 'Поле "Имя" обязательно для заполнения!', * Некорректный email!
        // emailError: 'Поле "E-mail" обязательно для заполнения. Введите корректный E-mail!',
        // telError: 'Поле "Телефон" обязательно для заполнения. Введите корректный телефон!',


        // isNeedToWarn: false
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
        this.setState( {tel: e.target.value, errorTel: 0} );
      };

      checkTel = () => {
        let telValue=(this.state.tel==="+375 (__) ___-__-__")?'':this.state.tel
        let check = checkTelValue(telValue);
        this.setState( {errorTel: check} );
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
          this.clearCart();
          alert("Заказ сформирован!");
        }
      }

      clearCart=()=>{
          this.state.name='';
          this.state.email='';
          this.state.tel='';
          this.state.note='';
      }


      

    warn=()=>{
        this.setState({isNeedToWarn: true})
    }

    changeInput = (EO) => {
        this.setState({[EO.target.name]: EO.target.value}, this.warn)
        // plantsEvents.emit('EvNeedToWarn', true);
    }



    validate = (EO) =>{
        // ----------------------- ВАЛИДАЦИЯ ВСЕХ ПОЛЕЙ ПРИ УХОДЕ С 1 ПОЛЯ-----------------------//
        // ЛУЧШЕ БЫЛО ДЕЛАТЬ ФУНКЦИИ ВАЛИДАЦИИ  ОТДЕЛЬНЫМИ  ФАЙЛАМИ И С RETURN ЧТОБЫ МОЖНО БЫЛО ЛЕГКО ПРОТЕСТИРОВАТЬ
        if (this.state.name === ""){
            this.setState({nameNotValid: true}, this.validAll)
        } else{
            this.setState({nameNotValid: false}, this.validAll)
        }
        
        if (this.state.surname === ""){
            this.setState({surnameNotValid: true}, this.validAll)
        } else{
            this.setState({surnameNotValid: false}, this.validAll)
        }
        
        if (this.state.tel === "" || !(/^\+375|80(\s+)?\(?(29|33|44|25|17)\)?(\s+)?[0-9]{3}-[0-9]{2}-[0-9]{2}$/.test(this.state.tel))){
            this.setState({telNotValid: true}, this.validAll)
        } else{
            this.setState({telNotValid: false}, this.validAll)
        }
        
        if (this.state.email === "" || !(/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/.test(this.state.email))){
            this.setState({emailNotValid: true}, this.validAll)
        } else{
            this.setState({emailNotValid: false}, this.validAll)
        }
    }
    

    validAll=(EO)=>{
        if (this.state.nameNotValid||
            this.state.surnameNotValid||
            this.state.telNotValid||
            this.state.emailNotValid
            )
                {this.setState({notValidForm: true}) //button disabled=true
        } else  {
            this.setState({notValidForm: false})
        }
    }

    addOrder=()=>{
        // plantsEvents.emit('EvNeedToWarn', false);
        let objCustomerInfo={        
            name: this.state.name,
            surname: this.state.surname,
            tel: this.state.tel,
            email: this.state.email,
            delivery: this.state.delivery,
            payment: this.state.payment,
            message: this.state.message,
        };
        let password=Math.random();

        let sp1 = new URLSearchParams();
        sp1.append('f', 'LOCKGET');
        sp1.append('n', 'YAKOVLEVA_PLANTS_ORDER');
        // проверка сохранения order через Ajax http://fe.it-academy.by/Examples/AJAXStringStorageReader.html
        sp1.append('p', password);
        isoFetch("http://fe.it-academy.by/AjaxStringStorage2.php", { // отправляем AJAX запрос
            method: 'POST',
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
            this.lockGetReady(data, objCustomerInfo, password);
        })
        .catch( (error) => {
            console.error(error);
        });
        this.props.dispatch( add_order( objCustomerInfo, this.props.basket.productsInBasket
                        ) );
        this.props.dispatch( clear_basket() );
        // plantsEvents.emit('EvMadeOrder', true);
        
    }

    lockGetReady = (callresult, objCustomerInfo, password) => {
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
    // ----------------------- ДОБАВЛЯЕМ НАШИ НОВЫЕ СООБЩЕНИЯ  ----------------------- //
            allInfoOrder.push( { customerInfo: objCustomerInfo , products: this.props.basket.productsInBasket } );
    
    // ----------------------- ДОБАВЛЯЕМ НАШИ ДАННЫЕ К УЖЕ ИМЕЮЩИМСЯ----------------------- //
    // и сохраняем их на сервере и отпираем их, чтобы они уже были доступны
            let sp2 = new URLSearchParams();
            sp2.append('f', 'UPDATE');
            sp2.append('n', 'YAKOVLEVA_PLANTS_ORDER');
            sp2.append("v", JSON.stringify(allInfoOrder));
            sp2.append('p', password);
            isoFetch("http://fe.it-academy.by/AjaxStringStorage2.php", {
                method: 'POST',
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
                    else
                        return response.json();
                })
                .catch( (error) => {
                    console.error(error);
                });
        }
    }

    componentWillUnmount=()=>{
        if(this.props.location.pathname !== "/basket" ){
            this.setState({isNeedToWarn: false})
        }
    }

    render(){
        return(
            <div className="Order">
                    {/* <Prompt
                        when={this.state.isNeedToWarn}
                        message="Возможно, внесенные изменения не сохранятся."
                    /> */}
                <h1>Оформление заказа:</h1>
                <div>
                    <label htmlFor="name" className="LabelOrder">Имя</label>
                    <input type="text" name="name" className="InputOrder" onChange = {this.changeName} onBlur = {this.checkName}></input>
                    <span className = {this.state.errorName == 1 ? "visible" : "invisible"}>{this.state.emptyValueError}</span>
                </div>
                <div>
                    <label htmlFor="email" className="LabelOrder">Email</label>
                    <input type="email" name="email" className="InputOrder" placeholder="email@gmail.com" onChange = {this.changeEmail} onBlur = {this.checkEmail}></input>
                    <span className = {this.state.errorEmail == 1 ? "visible" : "invisible"}>{this.state.emptyValueError}</span>
                    <span className = {this.state.errorEmail == 2 ? "visible" : "invisible"}>{this.state.emailError}</span>
                </div>
                <div>
                    <label htmlFor="tel" className="LabelOrder">Телефон</label>
                    <InputMask {...this.props} mask="+375 (99) 999-99-99" type="text" name="tel" className="InputOrder"  onChange = {this.changeTel} onBlur = {this.checkTel}></InputMask>
                    <span className = {this.state.errorTel == 1 ? "visible" : "invisible"}> {this.state.emptyValueError}</span>
                </div>
                <div>
                    <label htmlFor="message" className="LabelOrder">Сообщение</label>
                    <textarea name="message" className="TextareaOrder" onChange = {this.changeMessage} onBlur = {this.checkMessage}></textarea>
                    <span className = {this.state.errorMessage == 1 ? "visible" : "invisible"}> {this.state.emptyValueError}</span>
                </div>
                <input type="button" value="Оформить заказ" className="CheckoutButton" onClick = {this.checkForm} disabled={this.state.notValidForm}></input>
            </div>
        )
    }
}
export default Form
// const mapStateToProps = function (state) {
//     return {
//       // весь раздел Redux state под именем basket будет доступен
//       // данному компоненту как this.props.basket
//       order: state.order,
//       basket: state.basket,
//     };
//   };
  
//   export default withRouter(connect(mapStateToProps)(Order));
//   // экспортируем не этот класс CounterButton а уже обвернутый
