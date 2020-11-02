import Product from '../../models/product';
import { DELETE_PRODUCT, ADD_PRODUCT, EDIT_PRODUCT, SET_PRODUCTS } from '../actions/products';

const initialState = {
    availableProducts: [],
    userProducts: [],
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_PRODUCTS:            
            return {
                ...state,
                availableProducts: action.products,
                userProducts: action.products.filter(product => product.ownerId === action.userId),
            };
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
                action.productData.id,
                action.productData.userId,
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