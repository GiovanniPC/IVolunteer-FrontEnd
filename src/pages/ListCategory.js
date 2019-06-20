import withRoot from './modules/withRoot';
// --- Post bootstrap -----
import React, { Component } from 'react';
import ProductSmokingHero from './modules/views/ProductSmokingHero';
import AppFooter from './modules/views/AppFooter';
import AboutHero from './modules/views/AboutHero';
import AppAppBar from './modules/views/AppAppBar';
import ListTable from  './modules/components/Table/VehicleList';

class Lista extends Component{

  state={
    listagem: ''
  };
  render() {
   const listagem = this.props.location.state.name
    return (
      <React.Fragment>
        <AppAppBar />
        <AboutHero />
        <ListTable area={listagem}/>
        <ProductSmokingHero />
        <AppFooter />
      </React.Fragment>
    );
  }
}
export default withRoot(Lista);
