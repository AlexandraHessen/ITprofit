import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'; // позволяет React компоненту подписаться на Redux 
import isoFetch from 'isomorphic-fetch';

import PreviewCardProduct from '../components/PreviewCardProduct';
import './CatalogPage.css'

import Catalog from '../components/Catalog';

import { plantsLoadingAC, plantsErrorAC, plantsSetAC } from "../redux/plantsAC"; //action type

class CatalogPage extends React.PureComponent {

  static propTypes = {
    plants: PropTypes.object.isRequired,  //redux массив с растениями
  };

  componentDidMount= () => {
    if (!localStorage.plants){
      let sp1 = new URLSearchParams();
      sp1.append('f', 'READ');
      sp1.append('n', 'YAKOVLEVA_PLANTS_CATALOG3');
      isoFetch("http://fe.it-academy.by/AjaxStringStorage2.php", {
          method: 'POST',
          headers: {
              "Accept": "application/json",
          },
          body: sp1,
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
        .then( (data) => { //когда данные хорошо загружены
            this.props.dispatch( plantsSetAC(JSON.parse(data.result)) ); 
        })
        .catch( (error) => {
            console.error(error);
            this.props.dispatch( plantsErrorAC() ); // переводим раздел plants стора в состояние "ошибка"
          })
    ;
    } else {
      this.props.dispatch( plantsLoadingAC() );
    }
  }

  render() {

    if ( this.props.plants.status<=1 )
      return "загрузка...";

    if ( this.props.plants.status===2 )
      return "ошибка загрузки данных";
      
      let plantsArr=this.props.plants.data;
    return (
      <Catalog plantsArr={plantsArr} pageNumber={this.props.match.params.pageNumber}> </Catalog>
    );
  }
}

const mapStateToProps = function (state) {
  return {
    plants: state.plants,
  };
};

export default connect(mapStateToProps)(CatalogPage);
// connect(mapStateToProps) - значит подписан на redux 