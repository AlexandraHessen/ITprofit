"use strict";

import React from 'react';
import Form from './Form'
import ModalWindow from './ModalWindow'

import './MainPage.css'

class MainPage extends React.Component {

  state={
    isShowInfo: false
  }

  showInfo=(value)=>{
    this.setState( {isShowInfo: value} );
  }

  render() {
    return (
    <div className="MainPage">
          <Form />
          <input type="button" value="Информация" className="InfoButton" onClick = {() => this.showInfo(true)}></input>
          {
            (this.state.isShowInfo) &&
            <ModalWindow cbShowInfo={this.showInfo}/>
          }
          
    </div>


    );
  }
}

export default MainPage;
