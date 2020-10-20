import React from 'react';
import { FlatList, View, Text, Button, Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

// redux
import { useSelector, useDispatch } from 'react-redux';
import * as cartActions from '../../store/actions/cart';

// comps
import ProductItem from '../../components/shop/ProductItem';
import MyHeaderButton from '../../components/header/MyHeaderButton';

// styles
import colors from '../../styles/colors';

const ProductsOverviewScreen = props => {
    const products = useSelector(state => state.products.availableProducts);
    const dispatch = useDispatch();

    // functions
    const onSelect = (id, title) => {
        return props.navigation.navigate('ProductDetails', { productId: id, productTitle: title });
    };

    const renderProduct = itemData => {
        return (
            <ProductItem
                imageUrl={itemData.item.imageUrl}
                title={itemData.item.title}
                price={itemData.item.price}
                onSelect={() => onSelect(itemData.item.id, itemData.item.title)}
            >
                <Button
                    title='View Details'
                    onPress={() => onSelect(itemData.item.id, itemData.item.title)}
                    color={colors.primary}
                />
                <Button
                    title='To Cart'
                    onPress={() => dispatch(cartActions.addToCart(itemData.item))}
                    color={colors.primary}
                />
            </ProductItem>
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