import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';
import Menu from '../components/menu';

export default () => (

    <BrowserRouter>
        <Menu pageName='Home'/>
        <Routes/>
    </BrowserRouter>
)
