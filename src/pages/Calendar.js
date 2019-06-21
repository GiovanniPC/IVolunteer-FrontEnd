import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import events from '../utils/events';
import AppAppBar from './modules/views/AppAppBar';
import AppFooter from './modules/views/AppFooter';
import ProductHero from './modules/views/ProductHero';

const localizer = momentLocalizer(moment)

const MyCalendar = props => (
    <React.Fragment>
        <AppAppBar />
        <ProductHero />
        <AppFooter />
    </React.Fragment>
)
export default MyCalendar