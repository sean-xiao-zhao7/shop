import Product from '../../models/product';

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const ADD_PRODUCT = 'ADD_PRODUCT';
export const EDIT_PRODUCT = 'EDIT_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCTS';

export const fetchProducts = () => {
    return async dispatch => {
        try {
            const response = await fetch('https://shop-84327.firebaseio.com/products.json');

            // validate
            if (!response.ok) {
                throw new Error('Something went wrong.');
            }

            const resData = await response.json();
            const products = [];
            for (const key in resData) {
                products.push(new Product(
                    key,
                    'u1',
                    resData[key].title,
                    resData[key].imageUrl,
                    resData[key].description,
                    parseFloat(resData[key].price),
                ));
            };

            dispatch({
                type: SET_PRODUCTS,
                products: products,
            });
        } catch (e) {
            console.log(e);
            throw e;
        }
    };
}

export const deleteProduct = productId => {
    return {
        type: DELETE_PRODUCT,
        pid: productId,
    }
}

export const addProduct = (title, description, imageUrl, price) => {
    return async dispatch => {
        const response = await fetch('https://shop-84327.firebaseio.com/products.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title,
                description,
                imageUrl,
                price
            }),
        });

        const resData = await response.json();

        dispatch({
            type: ADD_PRODUCT,
            productData: {
                id: resData.name,
                title: title,
                description: description,
                imageUrl: imageUrl,
                price: price,
            },
        })
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