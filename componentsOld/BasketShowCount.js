"use strict";

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import {connect} from 'react-redux';

import './BasketShowCount.css'

class BasketShowCount extends React.Component{
    static propTypes = {
        basket: PropTypes.object.isRequired // пришло из Redux (для отображения количества товаров в корзине)
                                            // в ответ ничего не передаем 
                                            // ключ productsInBasket (this.props.basket.productsInBasket)
    };
    
    render(){
        let countProductsInBasket=Object.keys(this.props.basket.productsInBasket).length;
        
        return(

        <NavLink to="/basket"  className="BasketShowCount">
            <button type="button" className="ButtonToBasket">
                <i className="fas fa-shopping-cart"></i>
                <div className="CountProductsInBasket">
                    {countProductsInBasket}
                </div>
            </button>
        </NavLink>

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
  
  export default connect(mapStateToProps)(BasketShowCount);
  // экспортируем не этот класс BasketShowCount а уже обвернутый

