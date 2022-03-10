import React from 'react';
import { Route } from 'react-router-dom';

import MainPage from './MainPage';
import CatalogPage from './CatalogPage';
import ContactsPage from './ContactsPage';
import BasketPage from './BasketPage';

import Catalog from '../components/Catalog';
import PreviewCardProduct from '../components/PreviewCardProduct';
import CardProduct from '../components/CardProduct';

class RouterPages extends React.Component {
          
  render() {
    return (
      <div>
        <Route path="/" exact  />
        <Route path="/catalog/:pageNumber" exact component={CatalogPage} />
        <Route path="/catalog/:pageNumber/:productId" exact component={CardProduct} />
        <Route path="/contacts" component={ContactsPage} />
        <Route path="/basket" component={BasketPage} />
      </div>
    );
  }
}
    
export default RouterPages;