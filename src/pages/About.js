import withRoot from './modules/withRoot';
// --- Post bootstrap -----
import React from 'react';
import ProductSmokingHero from './modules/views/ProductSmokingHero';
import AppFooter from './modules/views/AppFooter';
import AboutHero from './modules/views/AboutHero';
import AboutValues from './modules/views/AboutValues';
import AppAppBar from './modules/views/AppAppBar';

function Index() {
  return (
    <React.Fragment>
      <AppAppBar />
      <AboutHero />
      <AboutValues />
      <ProductSmokingHero />
      <AppFooter />
    </React.Fragment>
  );
}

export default withRoot(Index);
