import React from 'react';
import { FlatList, View, Text, Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

// redux
import { useSelector, useDispatch } from 'react-redux';
import * as cartActions from '../../store/actions/cart';

// comps
import ProductItem from '../../components/shop/ProductItem';
import MyHeaderButton from '../../components/header/MyHeaderButton';

const ProductsOverviewScreen = props => {
    const products = useSelector(state => state.products.availableProducts);
    const dispatch = useDispatch();

    // functions
    const renderProduct = itemData => {
        return (
            <ProductItem
                imageUrl={itemData.item.imageUrl}
                title={itemData.item.title}
                price={itemData.item.price}
                onViewDetail={() => {
                    props.navigation.navigate('ProductDetails', { productId: itemData.item.id, productTitle: itemData.item.title })
                }}
                onToCart={() => {
                    dispatch(cartActions.addToCart(itemData.item));
                }}
            />
        );
    };

    return (
        <FlatList
            data={products}
            renderItem={renderProduct}
        />
    );
};

ProductsOverviewScreen.navigationOptions = navData => {
    return ({
        headerTitle: 'All Products',
        headerRight: () => <HeaderButtons HeaderButtonComponent={MyHeaderButton}>
            <Item
                title='Cart'
                iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
                onPress={() => {
                    navData.navigation.navigate('Cart')
                }}
            />
        </HeaderButtons>,
        headerLeft: () =>
            <HeaderButtons HeaderButtonComponent={MyHeaderButton}>
                <Item
                    title='Drawer'
                    iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                    onPress={() => {
                        navData.navigation.toggleDrawer()
                    }}
                />
            </HeaderButtons>,

    })
};

export default ProductsOverviewScreen;