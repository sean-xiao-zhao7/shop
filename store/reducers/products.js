import PRODUCTS from '../../data/dummy-data';
import Product from '../../models/product';
import { DELETE_PRODUCT, ADD_PRODUCT, EDIT_PRODUCT  } from '../actions/products';

const initialState = {
    availableProducts: PRODUCTS,
    userProducts: PRODUCTS.filter(product => product.ownerId === 'u1'),
};

export default (state = initialState, action) => {
    switch (action.type) {
        case DELETE_PRODUCT:
            return {
                ...state,
                availableProducts: state.userProducts.filter(
                    product => {
                        return product.id !== action.pid
                    }
                ),
                userProducts: state.userProducts.filter(
                    product => {
                        return product.id !== action.pid
                    }
                )
            };
        case ADD_PRODUCT:
            const newProduct = new Product(
                new Date().toString(),
                'u1',
                action.productData.title,
                action.productData.imageUrl,
                action.productData.description,
                parseFloat(action.productData.price),
            );

            return {
                ...state,
                availableProducts: state.availableProducts.concat(newProduct),
                userProducts: state.userProducts.concat(newProduct)
            };
        case EDIT_PRODUCT:
            const productIndex = state.userProducts.findIndex(p => p.id === action.productId);
            const productIndex2 = state.availableProducts.findIndex(p => p.id === action.productId);

            let editedProduct = new Product(
                state.userProducts[productIndex].id,
                state.userProducts[productIndex].ownerId,
                action.productData.title,
                action.productData.imageUrl,
                action.productData.description,
                action.productData.price,
            );

            let newAvailableProducts = [...state.availableProducts];
            let newUserProducts = [...state.userProducts];
            newAvailableProducts[productIndex2] = editedProduct;
            newUserProducts[productIndex] = editedProduct;

            return {
                ...state,
                availableProducts: newAvailableProducts,
                userProducts: newUserProducts,
            };
        default:
            return state;
    }
};