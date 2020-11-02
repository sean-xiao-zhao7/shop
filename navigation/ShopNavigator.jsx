import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import { Platform, Button, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// screens
import ProductsOverviewScreen from '../screens/products/ProductsOverviewScreen';
import ProductDetailsScreen from '../screens/products/ProductDetailsScreen';
import CartScreen from '../screens/products/CartScreen';
import OrdersScreen from '../screens/products/OrdersScreen';
import UserProductsScreen from '../screens/user/UserProductsScreen';
import EditProductScreen from '../screens/user/EditProductScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import AutoLoginScreen from '../screens/auth/AutoLoginScreen';

// styles
import Colors from '../styles/colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import colors from '../styles/colors';

// redux
import { useDispatch } from 'react-redux';
import { logoutAction } from '../store/actions/auth';

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

const shopNavigator = createDrawerNavigator({
    ProductsStack: ProductsNavigator,
    OrdersStack: OrdersNavigator,
    UserStack: UserNavigator,
}, {
    contentOptions: {
        activeTintColor: Colors.primary
    },
    contentComponent: props => {
        const dispatch = useDispatch();
        return (
            <View style={{flex: 1}}>
                <SafeAreaView
                    forceInset={{top: 'always', horizontal: 'never'}}
                >
                    <DrawerItems {...props} />
                    <Button 
                        title='Logout'
                        color={colors.primary}
                        onPress={() => {
                            dispatch(logoutAction());
                        }}
                    />
                </SafeAreaView>
            </View>
        )
    },
});

const authNavigator = createStackNavigator({
    Login: LoginScreen,
}, { defaultNavigationOptions: defaultStackNavigationOptions });

const rootNavigator = createSwitchNavigator({
    AutoLogin: AutoLoginScreen,
    Auth: authNavigator,
    Shop: shopNavigator,
});

export default createAppContainer(rootNavigator);