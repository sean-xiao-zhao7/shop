import Product from '../../models/product';

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const ADD_PRODUCT = 'ADD_PRODUCT';
export const EDIT_PRODUCT = 'EDIT_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCTS';

export const fetchProducts = () => {
    return async (dispatch, getState) => {
        const userId = getState().auth.userId;
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
                    resData[key].ownerId,
                    resData[key].title,
                    resData[key].imageUrl,
                    resData[key].description,
                    parseFloat(resData[key].price),
                ));
            };

            dispatch({
                type: SET_PRODUCTS,
                products: products,
                userId: userId,
            });
        } catch (e) {
            console.log(e);
            throw e;
        }
    };
}

export const deleteProduct = productId => {
    return async (dispatch, getState) => {
        const userToken = getState().auth.token;
        const response = await fetch(
            `https://shop-84327.firebaseio.com/products/${productId}.json?auth=${userToken}`,
            {
                method: 'DELETE',                       
            }
        )
        dispatch({
            type: DELETE_PRODUCT,
            pid: productId,
        });
    };
}

export const addProduct = (title, description, imageUrl, price) => {
    const floatPrice = parseFloat(price);
    return async (dispatch, getState) => {
        const userToken = getState().auth.token;
        const userId = getState().auth.userId;
        const response = await fetch(`https://shop-84327.firebaseio.com/products.json?auth=${userToken}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title,
                description,
                imageUrl,
                floatPrice,
                ownerId: userId
            }),
        });

        if (!response.ok) {
            throw new Error('Something is wrong.');
        }

        const resData = await response.json();

        dispatch({
            type: ADD_PRODUCT,
            productData: {
                id: resData.name,
                title: title,
                description: description,
                imageUrl: imageUrl,
                price: floatPrice,
                userId: userId,
            },
        })
    }
}

export const editProduct = (productId, title, description, imageUrl, price) => {
    const floatPrice = parseFloat(price);
    return async (dispatch, getState) => {
        const userToken = getState().auth.token;
        const response = await fetch(`https://shop-84327.firebaseio.com/products/${productId}.json?auth=${userToken}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title,
                description,
                imageUrl,
                floatPrice
            }),
        });

        //console.log(await response.json());
        if (!response.ok) {
            response = await response.json();
            throw new Error(response.error.message);
        }

        dispatch({
            type: EDIT_PRODUCT,
            productId: productId,
            productData: {
                title: title,
                description: description,
                imageUrl: imageUrl,
                price: floatPrice,
            },
        });
    };
}