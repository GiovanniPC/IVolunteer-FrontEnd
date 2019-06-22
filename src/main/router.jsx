import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from '../pages/Home';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import About from '../pages/About';
import ListCategory from '../pages/ListCategory';
import Profile from '../pages/Profile';
import Agenda from '../pages/Agenda';
import Logout from '../pages/Logout';
import { isAuthenticated } from '../services/auth';
import history  from './history';

const PrivateRouter =({ component: Component, ...rest }) => (
    <Route
    {...rest}
        render={props => 
            isAuthenticated() ? (
               <Component {...props} />
           ): (
                <Redirect to={{pathname:"/", state: {from: props.location} }}/>
           )
        }
     />
 )

export default () => (
        <Switch history={history}>
            <Route path='/' exact={true} component={Home} />
            <Route path='/sign-in' component={SignIn} />
            <Route path='/sign-up' component={SignUp} />
            <Route path='/logout' component={Logout} />            
            <Route path='/about' component={About} />
            <Route path='/list' component={ListCategory} />
            <Route path='/agenda' component={Agenda} />
            <PrivateRouter path='/profile' component={Profile}/>
            <Redirect from='*' to='/' />
        </Switch>
)
