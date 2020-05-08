import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/cart"
import CartItem from '../../models/cart-item'
import { act } from "react-test-renderer";
import { ADD_ORDER } from "../actions/orders";
import { DELETE_PRODUCT } from "../actions/products";

const initialState = {
    items: {},
    totalPrice: 0.0
}

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const incomingProduct = action.product;
            const productTitle = incomingProduct.title;
            const productPrice = incomingProduct.price;

            let productItem;

            if (state.items[incomingProduct.id]) {
                productItem = new CartItem(
                    productTitle,
                    state.items[incomingProduct.id].productPrice + productPrice,
                    productPrice,
                    state.items[incomingProduct.id].quantity + 1
                )
            } else {
                productItem = new CartItem(
                    productTitle,
                    productPrice,
                    productPrice,
                    1);

            }

            return {
                // ...state,
                items: { ...state.items, [incomingProduct.id]: productItem },
                totalPrice: state.totalPrice + productPrice
            }
        case REMOVE_FROM_CART:

            const product = state.items[action.productId];
            let quantity = product.quantity;
            let updatedCartItems = { ...state.items }
            if (quantity > 1) {
                const updatedCartItem = new CartItem(
                    product.productTitle,
                    product.sum - product.productPrice,
                    product.productPrice,
                    quantity - 1);
                updatedCartItems = {...state.items,[action.productId]: updatedCartItem}
                    
            } else {
                delete updatedCartItems[action.productId]
            }
            return {
                items: updatedCartItems,
                totalPrice: state.totalPrice - product.productPrice
            }
        case ADD_ORDER:
            return initialState;
        case DELETE_PRODUCT:
            if(!state.items[action.productId]){
                return state;
            }
            const updatedItems = {...state.items}
            const itemTotal = state.items[action.productId].sum
            delete updatedItems[action.productId]
            return {
                ...state,
                items: updatedItems,
                totalPrice: state.totalPrice - itemTotal
            }
        default:
            return state;
    }
}