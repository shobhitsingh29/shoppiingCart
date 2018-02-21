import React, {Component} from 'react';
import {findDOMNode} from 'react-dom';
import {Link} from "react-router-dom"
import Footer from "./Footer"

import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

import EmptyCart from '../empty-states/EmptyCart';

class Cartpreview extends Component {
    constructor(props) {
        super(props);
        this.cartItems = [];
        this.state = {
            total: (this.props.location.query && this.props.location.query.total ) ? this.props.location.query.total : JSON.parse(localStorage.getItem("cartTotal")),
            flag: false
        };
        this.items = this.items.bind(this);

    }

    componentWillMount() {

        if (!localStorage.getItem("cartItem")) {

            localStorage.setItem("cartItem", JSON.stringify(this.props.location.query.items));
            localStorage.setItem("cartTotal", JSON.stringify(this.props.location.query.total));

        }
        this.cartItems = JSON.parse(localStorage.getItem("cartItem"));

    }

    items(items) {
        //   this.state.total=0;
        let cartItems = items.map((product, key) => {

            //      this.state.total += product.price;
            //   localStorage.setItem("cartTotal", JSON.stringify(this.state.total));

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
                    <a className="remove-item" onClick={(e) => {


                        let setStorage = JSON.parse(localStorage.getItem("cartItem")).filter((value, key) => {

                            if ((value.name.includes(e.target.parentNode.innerText.replace("\n").split(" ")[1].split("\n")[0]))) {
                                var total = this.state.total;
                                total -= value.price;
                                this.setState({total});
                                localStorage.setItem("cartTotal", JSON.stringify(total));
                            }
                            return !(value.name.includes(e.target.parentNode.innerText.replace("\n").split(" ")[1].split("\n")[0]));
                        });

                        localStorage.setItem('cartItem', JSON.stringify(setStorage));
                        e.target.parentNode.remove();
                        console.log(this.state.total);
                        this.setState({flag: true});
                    }}>×</a>

                </li>)

            //this.setState({flag : true});
        });

        let view;
        if (cartItems.length <= 0) {
            view = <EmptyCart/>
        } else {
            view = <CSSTransitionGroup transitionName="fadeIn" transitionEnterTimeout={500} transitionLeaveTimeout={300}
                                       component="ul">{cartItems}</CSSTransitionGroup>
        }
        return view;
    }

    render() {
        return (
            <div>
                <div className="item-div container jumbotron">
                    {this.items(this.cartItems)}


                    <div className="total-div">Total:{this.state.total}
                    </div>

                    <div>
                    </div>
                    <Link to='/checkout'>
                        <div>

                            <button type="button"
                                    className={this.cartItems.length > 0 ? "checkout-btn " : " checkout-btn disabled"}>
                                PROCEED TO CHECKOUT
                            </button>

                        </div>
                    </Link>
                    <Link to="/home">
                        <button className="checkout-btn continue-btn btn-ctn">CONTINUE SHOPPING</button>
                    </Link>

                </div>
                <Footer></Footer>
            </div>
        )
    }
}

export default Cartpreview;
