import Order from "./../../models/Order";

export const ADD_ORDER = "ADD_ORDER";
export const SET_ORDERS = "SET_ORDERS";

export const addOrder = (cartItems, totalAmount) => {
  return async (dispatch, getState) => {
    const date = new Date().toISOString();
    const userId = getState().auth.userId;
    const token = getState().auth.token;
    const response = await fetch(
      `https://rn-one.firebaseio.com/orders/${userId}.json?auth=${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cartItems,
          totalAmount,
          date,
        }),
      }
    );

    const resData = await response.json();

    if (!response.ok) {
    }

    dispatch({
      type: ADD_ORDER,
      orderData: {
        id: resData.name,
        items: cartItems,
        amount: totalAmount,
        date,
      },
    });
  };
};

export const fetchOrders = () => {
  return async (dispatch, getState) => {
    try {
      const userId = getState().auth.userId;
      const token = getState().auth.token;
      const response = await fetch(
        `https://rn-one.firebaseio.com/orders/${userId}.json?auth=${token}`
      );
      if (!response.ok) {
        throw new Error("Something went wrong !");
      }
      const resData = await response.json();
      const loadedOrders = [];
      for (const key in resData) {
        const curObj = resData[key];
        loadedOrders.push(
          new Order(
            key,
            curObj.cartItems,
            curObj.totalAmount,
            new Date(curObj.date)
          )
        );
      }
      dispatch({
        type: SET_ORDERS,
        orders: loadedOrders,
      });
    } catch (error) {
      throw error;
    }
  };
};
