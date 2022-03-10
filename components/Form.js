"use strict";

import React from 'react';
import PropTypes from 'prop-types';
import InputMask from 'react-input-mask';

import './Form.css'

class Form extends React.Component{
    state={
        name: '',
        surname: '',
        tel: '',
        email: '',
        delivery: 'pickup',
        payment: 'cash',
        note: '',

        nameNotValid: false,    // когда ошибка = true отображается  <span> с ошибкой  (логич выражение) && JSX
        surnameNotValid: false,
        telNotValid: false,
        emailNotValid: false,

        notValidForm: false, // когда вся форма не валидна = true, т.к. buttonSave должен быть disabled= true

        nameError: 'Поле "Имя" обязательно для заполнения!',
        surnameError: 'Поле "Фамилия" обязательно для заполнения!',
        telError: 'Поле "Телефон" обязательно для заполнения. Введите корректный телефон!',
        emailError: 'Поле "E-mail" обязательно для заполнения. Введите корректный E-mail!',

        isNeedToWarn: false
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
            note: this.state.note,
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
                    <input type="text" name="name" className="InputOrder" onChange={this.changeInput} onBlur={this.validate} autoFocus></input>
                    {(this.state.nameNotValid)&&<span className="Error">{this.state.nameError}</span>} 
                </div>
                <div>
                    <label htmlFor="email" className="LabelOrder">Email</label>
                    <input type="email" name="email" className="InputOrder" placeholder="email@gmail.com"onChange={this.changeInput} onBlur={this.validate}></input>
                    {(this.state.emailNotValid)&&<span className="Error">{this.state.emailError}</span>} 
                </div>
                <div>
                    <label htmlFor="tel" className="LabelOrder">Телефон</label>
                    {/* <input type="text" name="tel" className="InputOrder" placeholder="+37529111-22-33" onChange={this.changeInput} onBlur={this.validate}></input> */}
                    <InputMask {...this.props} mask="+4\9 99 999 99" type="text" name="tel" className="InputOrder"  onChange={this.changeInput} onBlur={this.validate}></InputMask>
                    {(this.state.telNotValid)&&<span className="Error">{this.state.telError}</span>} 
                </div>
                <div>
                    <label htmlFor="note" className="LabelOrder">Сообщение</label>
                    <textarea name="note" className="TextareaOrder" onChange = {this.changeInput}></textarea>
                </div>
                <input type="button" value="Оформить заказ" className="CheckoutButton" onClick = {this.addOrder} disabled={this.state.notValidForm}></input>
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
