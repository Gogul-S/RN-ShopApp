import Order from "./../../models/Order";
import { ADD_ORDER, SET_ORDERS } from "../actions/orders";

const initialState = {
  orders: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_ORDER:
      const newOrder = new Order(
        action.orderData.id,
        action.orderData.items,
        action.orderData.amount,
        action.orderData.date
      );
      return {
        ...state,
        orders: state.orders.concat(newOrder),
      };

    case SET_ORDERS:
      return {
        ...state,
        orders: action.orders,
      };
  }
  return state;
};
