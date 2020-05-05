import { ADD_TO_CART } from "../actions/cart"
import CartItem from '../../models/cart-item'

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
                    state.items[incomingProduct.id] + productPrice,
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
            break;
            default:
                return state;
    }
}