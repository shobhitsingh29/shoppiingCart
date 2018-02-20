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

    handleCart(e) {
        e.preventDefault();
        this.setState({
            showCart: !this.state.showCart
        })
    }

    handleSubmit(e) {
        e.preventDefault();
    }

    handleMobileSearch(e) {
        e.preventDefault();
        this.setState({
            mobileSearch: true
        })
    }

    handleSearchNav(e) {
        e.preventDefault();
        this.setState({
            mobileSearch: false
        }, function () {
            this.refs.searchBox.value = "";
            this.props.handleMobileSearch();
        })
    }

    handleClickOutside(event) {
        const cartNode = findDOMNode(this.refs.cartPreview);
        const buttonNode = findDOMNode(this.refs.cartButton);
        if (cartNode.classList.contains('active')) {
            if (!cartNode || !cartNode.contains(event.target)) {
                this.setState({
                    showCart: false
                })
                event.stopPropagation();
            }
        }
    }

    componentDidMount() {
        document.addEventListener('click', this.handleClickOutside.bind(this), true);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleClickOutside.bind(this), true);
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
