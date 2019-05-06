import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { isAuthenticated } from '../services/auth';
import history  from './history';
import About from '../pages/about';
import Login from '../pages/login';
import SignUp from '../pages/signUp';
import Profile from '../pages/profile';
import Index from '../pages';

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
            <Route path='/' exact={true} component={Index} />
            <Route path='/about' component={About} />
            <Route path='/login' component={Login} />
            <Route path='/signup' component={SignUp} />
            <PrivateRouter path='/profile' component={Profile}/>
            <Redirect from='*' to='/' />
        </Switch>
)
