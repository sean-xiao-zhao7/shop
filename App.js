import React, { useState } from 'react';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';

// redux
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import productsReducer from './store/reducers/products';
import cartReducer from './store/reducers/cart';
import ordersReducer from './store/reducers/orders';
import ReduxThunk from 'redux-thunk';
const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orders: ordersReducer,
});
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

// navigator
import ShopNavigator from './navigation/ShopNavigator';

export default function App() {
  const [loaded, error] = Font.useFonts({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });
  if (!loaded) {
    return (
      <AppLoading
      />
    );
  }

  return (
    <Provider store={store}>
      <ShopNavigator />
    </Provider>
  );
}