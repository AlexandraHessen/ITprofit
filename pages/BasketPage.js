import React from "react";
import PropTypes from "prop-types";
import {connect} from 'react-redux';

import { ADD_PRODUCT, DEL_PRODUCT } from '../redux/basketAC';
import {plantsEvents} from '../components/events';

import Basket from '../components/Basket'
import "./BasketPage.css"

class BasketPage extends React.Component{
    static propTypes = {
        basket: PropTypes.object.isRequired, // пришло из Redux для проверки есть ли что-то в корзине
                                            // в ответ ничего не передаем 
    }

    state={
        isMadeOrder: false,
        isNeedToWarn: false,
    }

    componentDidMount =()=>{
        plantsEvents.addListener('EvMadeOrder', this.evMadeOrder);
        plantsEvents.addListener('EvNeedToWarn', this.evNeedToWarn);
        this.scrollTop();
    }

    componentWillUnmount =()=>{
        plantsEvents.removeListener('EvMadeOrder', this.evMadeOrder);
        plantsEvents.removeListener('EvNeedToWarn', this.evNeedToWarn);
        window.onbeforeunload = null;
    }

    evMadeOrder=()=>{
        this.setState({isMadeOrder: true})
    }

    evNeedToWarn=(isNeedToWarn)=>{
        this.setState({isNeedToWarn: isNeedToWarn})
    }

    scrollTop = () => {
        window.scrollTo(0, 0);
    };


    render(){
        if(this.state.isNeedToWarn){
            window.onbeforeunload = function() {
                return true;
            };
        } else {
            window.onbeforeunload = null
        }
        let countProductsInBasket=Object.keys(this.props.basket.productsInBasket).length;
        return(
            <div className="BasketPage">
                <h1>Корзина</h1>
                {(countProductsInBasket == 0) ? 

                    ((this.state.isMadeOrder) ?
                    (<div><h1 className="OrderMade">Ваш заказ оформлен!</h1></div>) :
                    (<h3>Корзина пуста.</h3>) ) : 

                <Basket/>}
            </div>
        )
    }
}

const mapStateToProps = function (state) {
    return {
      // весь раздел Redux state под именем basket будет доступен
      // данному компоненту как this.props.basket
      basket: state.basket,
    };
  };
  
  export default connect(mapStateToProps)(BasketPage);
  // экспортируем не этот класс CounterButton а уже обвернутый
  