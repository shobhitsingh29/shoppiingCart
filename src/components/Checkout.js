import React, {Component} from 'react';
import CartScrollBar from './CartScrollBar';
import EmptyCart from '../empty-states/EmptyCart';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import {findDOMNode} from 'react-dom';
import {Link} from "react-router-dom"

import Footer from "./Footer"


class Checkout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showCart: false,
            cart: this.props.cartItems,
            mobileSearch: false
        };
    }


    componentDidMount() {

        localStorage.clear();
    }

    render() {
        return (
            <div>
                <div className="jumbotron text-xs-center">
                    <h1 className="display-3">Thank You for
                        shopping with us</h1>
                    <p className="lead">Your order has been places successfully</p>
                    <Link to="/home">
                        <button className="checkout-btn continue-btn">CONTINUE SHOPPING</button>
                    </Link>

                </div>
                <Footer></Footer>
            </div>
        )
    }
}

export default Checkout;
