import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// screens
import ProductsOverviewScreen from '../screens/products/ProductsOverviewScreen';
import ProductDetailsScreen from '../screens/products/ProductDetailsScreen';
import CartScreen from '../screens/products/CartScreen';
import OrdersScreen from '../screens/products/OrdersScreen';
import UserProductsScreen from '../screens/user/UserProductsScreen';
import EditProductScreen from '../screens/user/EditProductScreen';

// styles
import Colors from '../styles/colors';

const defaultStackNavigationOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primary : '',
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
};

const ProductsNavigator = createStackNavigator({
    ProductsOverview: ProductsOverviewScreen,
    ProductDetails: ProductDetailsScreen,
    Cart: CartScreen,
}, {
    navigationOptions: {
        title: 'Shop',
        drawerIcon: (drawerConfig) => (
            <Ionicons name={Platform.OS === 'android' ? 'md-create' : 'ios-create'} size={23} color={drawerConfig.tintColor} />
        )
    },
    defaultNavigationOptions: defaultStackNavigationOptions,
});

const OrdersNavigator = createStackNavigator({
    Orders: OrdersScreen
}, {
    navigationOptions: {
        title: 'Orders',
        drawerIcon: (drawerConfig) => (
            <Ionicons name={Platform.OS === 'android' ? 'md-list' : 'ios-list'} size={23} color={drawerConfig.tintColor} />
        ) 
    },
    defaultNavigationOptions: defaultStackNavigationOptions,
});

const UserNavigator = createStackNavigator({
    UserProducts: UserProductsScreen,
    EditProduct: EditProductScreen,
}, {
    navigationOptions: {
        title: 'Manage',
        drawerIcon: (drawerConfig) => (
            <Ionicons name={Platform.OS === 'android' ? 'md-contact' : 'ios-contact'} size={23} color={drawerConfig.tintColor} />
        ) 
    },
    defaultNavigationOptions: defaultStackNavigationOptions,
});

const rootNavigator = createDrawerNavigator({
    ProductsStack: ProductsNavigator,
    OrdersStack: OrdersNavigator,
    UserStack: UserNavigator,
}, {
    contentOptions: {
        activeTintColor: Colors.primary
    }
})

export default createAppContainer(rootNavigator);