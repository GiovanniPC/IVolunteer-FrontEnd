import withRoot from './modules/withRoot';
// --- Post bootstrap -----
import React, { Component } from 'react';
import ProductSmokingHero from './modules/views/ProductSmokingHero';
import AppFooter from './modules/views/AppFooter';
import ListHero from './modules/views/ListHero';
import AppAppBar from './modules/views/AppAppBar';
import ListTable from  './modules/components/Table/VehicleList';
import { images } from '../utils/variables';

class Lista extends Component{

  state={
    listagem: '',
    title:''
  };
  change = (val) => {
    this.setState({title: images[val]})
  }
  render() {
   const listagem = this.props.location.state.name
   const title = images[this.props.location.state.name]
    return (
      <React.Fragment>
        <AppAppBar />
        <ListHero title={this.state.title? this.state.title: title} change={this.change} />
        <ListTable area={listagem} change={this.change}/>
        <ProductSmokingHero />
        <AppFooter />
      </React.Fragment>
    );
  }
}
export default withRoot(Lista);
