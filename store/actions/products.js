import Product from "../../models/product";

export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const SET_PRODUCT = "SET_PRODUCT";

export const fetchProducts = () => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    try {
      const response = await fetch(
        `https://rn-one.firebaseio.com/products.json?auth=${token}`
      );
      if (!response.ok) {
        throw new Error("Something went wrong !");
      }
      const resData = await response.json();
      const loadedProducts = [];
      for (const key in resData) {
        const curObj = resData[key];
        loadedProducts.push(
          new Product(
            key,
            curObj.ownerId,
            curObj.title,
            curObj.imageUrl,
            curObj.desc,
            curObj.price
          )
        );
      }
      const ownerId = getState().auth.userId;
      dispatch({
        type: SET_PRODUCT,
        products: loadedProducts,
        userProducts: loadedProducts.filter(
          (product) => product.ownerId === ownerId
        ),
      });
    } catch (error) {
      throw error;
    }
  };
};

export const deleteProduct = (id) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const response = await fetch(
      `https://rn-one.firebaseio.com/products/${id}.json?auth=${token}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error("Something went Wrong");
    }

    dispatch({
      type: DELETE_PRODUCT,
      productId: id,
    });
  };
};

export const createProduct = (title, desc, price, imageUrl) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const ownerId = getState().auth.userId;
    const response = await fetch(
      `https://rn-one.firebaseio.com/products.json?auth=${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          price,
          imageUrl,
          desc,
          ownerId,
        }),
      }
    );

    const resData = await response.json();

    dispatch({
      type: CREATE_PRODUCT,
      productData: {
        id: resData.name,
        title: title,
        desc: desc,
        price: price,
        imageUrl: imageUrl,
        ownerId,
      },
    });
  };
};

export const updateProduct = (id, title, desc, imageUrl) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const response = await fetch(
      `https://rn-one.firebaseio.com/products/${id}.json?auth=${token}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          imageUrl,
          desc,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Something went Wrong !");
    }

    dispatch({
      type: UPDATE_PRODUCT,
      productId: id,
      productData: {
        title: title,
        desc: desc,
        imageUrl: imageUrl,
      },
    });
  };
};
