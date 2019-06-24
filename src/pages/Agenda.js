import withRoot from './modules/withRoot';
// --- Post bootstrap -----
import React from 'react';
import AppFooter from './modules/views/AppFooter';
import ProductHero from './modules/views/AgendaHero';
import AgendaHowItWorks from './modules/views/AgendaHowItWorks';
import ProductSmokingHero from './modules/views/ProductSmokingHero';
import AppAppBar from './modules/views/AppAppBar';
import EventCalendar from './modules/components/Calendar';

function Index() {

    return (
        <React.Fragment>
            <AppAppBar />
            <ProductHero />
            <EventCalendar />
            <AgendaHowItWorks />
            <ProductSmokingHero />
            <AppFooter />
        </React.Fragment>
);
}

export default withRoot(Index);
