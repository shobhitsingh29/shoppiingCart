import React from 'react';
import ReactDOM from 'react-dom';
import Home from './main';
import Checkout from  "./components/Checkout"
import Cartpreview from  "./components/Cartpreview"

import {BrowserRouter as Router, Route, Link, Switch, Redirect, browserHistory} from "react-router-dom"

class Store extends React.Component {

    render() {
        return (
			<Router history={browserHistory} >
				<Switch>
					<Redirect exact from="/" to="/home"/>
					<Route  path="/home" component={Home}/>
					<Route  path="/checkout" component={Checkout}/>
					<Route  path="/cartpreview" component={Cartpreview}/>
					<Route path='*' component={Home} />
					<Redirect from='*' to='/home' />

				</Switch>
			</Router>
        )
    }
}

ReactDOM.render(
	<Store />,
    document.getElementById('root')
);

export default Store;
