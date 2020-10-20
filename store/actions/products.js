export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const ADD_PRODUCT = 'ADD_PRODUCT';
export const EDIT_PRODUCT = 'EDIT_PRODUCT';

export const deleteProduct = productId => {
    return {
        type: DELETE_PRODUCT,
        pid: productId,
    }
}

export const addProduct = (title, description, imageUrl, price) => {
    return {
        type: ADD_PRODUCT,
        productData: {
            title: title,
            description: description,
            imageUrl: imageUrl,
            price: price,
        },
    }
}

export const editProduct = (productId, title, description, imageUrl, price) => {
    return {
        type: EDIT_PRODUCT,
        productId: productId,
        productData: {
            title: title,
            description: description,
            imageUrl: imageUrl,
            price: price,
        },
    }
}