import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import {connect} from 'react-redux'; // позволяет React компоненту подписаться на Redux 
import isoFetch from 'isomorphic-fetch';

import './CardProduct.css'

import { plantsLoadingAC, plantsErrorAC, plantsSetAC } from "../redux/plantsAC"; //action type
import {add_product} from '../redux/basketAC';

class CardProduct extends React.PureComponent {

  static propTypes = {
    plants: PropTypes.object.isRequired,  //передано из Redux  (массив с объектами растений)
                                          // this.props.plants.data =  [{…}, {…}, {…}, {…}]
  };

  addProductToBasket = (plantId, plantInfo) =>{
    this.props.dispatch( add_product(plantId,plantInfo) );
  }

  render() {

    let plantId=parseInt(this.props.match.params.productId);
    let plantInfo=this.props.plants.data.find(plant=>plant.code==plantId);

      return(
          <div className="CardProduct">
              <img src={plantInfo.imgUrl} className="PlantImg" />
              <div className="CardProduct">
                <h1 className="NameProduct">{plantInfo.name}</h1>
                <h4 className="Price">{plantInfo.price} руб.</h4>
                <NavLink to="/basket">
                    <button type="button" onClick = {() => this.addProductToBasket(plantId, plantInfo)} className="ButtonToBasket">
                        <i className="fas fa-shopping-cart"></i>
                    </button>
                </NavLink>
                <h4>Описание:</h4>
                <p> {plantInfo.description}</p>
              </div>
      </div>
      )
  }

}

const mapStateToProps = function (state) {
  return {
    plants: state.plants,
  };
};

export default connect(mapStateToProps)(CardProduct);
// connect(mapStateToProps) - значит подписан на redux 