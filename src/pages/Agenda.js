import withRoot from './modules/withRoot';
// --- Post bootstrap -----
import React from 'react';
import AppFooter from './modules/views/AppFooter';
import ProductHero from './modules/views/AgendaHero';
import ProductHowItWorks from './modules/views/ProductHowItWorks';
import AppAppBar from './modules/views/AppAppBar';
import EventCalendar from './modules/components/Calendar';

function Index() {

    return (
        <React.Fragment>
            <AppAppBar />
            <ProductHero />
            <EventCalendar />
            <ProductHowItWorks />
            <AppFooter />
        </React.Fragment>
);
}

export default withRoot(Index);
