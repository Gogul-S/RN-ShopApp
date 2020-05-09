export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";

export const deleteProduct = (id) => {

    return {
        type: DELETE_PRODUCT,
        productId: id
    }
}

export const createProduct = (title, desc, price, imageUrl) => {

    return {
        type: CREATE_PRODUCT,
        productData: {
            title: title,
            desc: desc,
            price: price,
            imageUrl: imageUrl
        }
    }
}

export const updateProduct = (id, title, desc, imageUrl) => {

    return {
        type: UPDATE_PRODUCT,
        productId: id,
        productData: {
            title: title,
            desc: desc,
            imageUrl: imageUrl
        }
    }
}