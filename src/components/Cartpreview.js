import React, {Component} from 'react';
import CartScrollBar from './CartScrollBar';
import Header from './Header';
import {findDOMNode} from 'react-dom';
import {Link} from "react-router-dom"
import Footer from "./Footer"

import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

import EmptyCart from '../empty-states/EmptyCart';

class Cartpreview extends Component {
    constructor(props) {
        super(props);
        this.items = this.items.bind(this);

    }
    componentDidMount() {
        document.removeEventListener('click',()=>{}, true);
    }
    items(items) {
        let cartItems = items.map(function (product, key) {

            return (

                <li className="cart-item cart-view" key={product.name}>
                    <img className="product-image" src={product.image}/>
                    <div className="product-info">
                        <p className="product-name">{product.name}</p>
                        <p className="product-price">{product.price}</p>
                    </div>
                    <div className="product-total">
                        <p className="quantity">{product.quantity} {product.quantity > 1 ? "Nos." : "No."} </p>
                        <p className="amount">{product.quantity * product.price}</p>
                    </div>
                    <a>×</a>
                </li>)
        });
        let view;
        if(cartItems.length <= 0){
            view = <EmptyCart />
        } else{
            view = <CSSTransitionGroup transitionName="fadeIn" transitionEnterTimeout={500} transitionLeaveTimeout={300} component="ul" className="cart-items">{cartItems}</CSSTransitionGroup>
        }
        return view;

    }

    render() {
        return (
            <div>

                <div className="item-div" >


                        {this.items(this.props.location.query.items)}
                    <Link to='/checkout'>
                        <div>

                            <button type="button"className={this.props.location.query.items.length > 0 ? "checkout-btn " : " checkout-btn disabled"}>PROCEED TO CHECKOUT</button>

                        </div>
                    </Link>
                </div>
                <Footer></Footer>
            </div>
        )
    }
}

export default Cartpreview;
