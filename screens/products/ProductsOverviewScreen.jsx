import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, View, Text, Button, Platform, ActivityIndicator } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

// redux
import { useSelector, useDispatch } from 'react-redux';
import * as cartActions from '../../store/actions/cart';
import { fetchProducts } from '../../store/actions/products';

// comps
import ProductItem from '../../components/shop/ProductItem';
import MyHeaderButton from '../../components/header/MyHeaderButton';

// styles
import colors from '../../styles/colors';
import css from '../../styles/css';
import PrettyIndicator from '../../components/styles/PrettyIndicator';
import PrettyText from '../../components/styles/PrettyText';

const ProductsOverviewScreen = props => {
    // states
    const [loading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);

    // setup redux
    const products = useSelector(state => state.products.availableProducts);
    const dispatch = useDispatch();

    // functions
    const onSelect = (id, title) => {
        return props.navigation.navigate('ProductDetails', { productId: id, productTitle: title });
    };

    const loadProducts = useCallback(() => {
        setIsLoading(true);
        dispatch(fetchProducts()).then(() => { setIsLoading(false) }).catch((e) => {
            setError(e.message);
            setIsLoading(false);
        });
    }, [dispatch, setIsLoading])

    // fetch products
    useEffect(() => {
        const willFocusSub = props.navigation.addListener('willFocus', loadProducts);
        return () => {
            willFocusSub.remove();
        }
    }, [loadProducts]);

    useEffect(() => {
        loadProducts();
    }, [dispatch])

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

    // prepare loading
    if (error) {
        return <View style={css.center}>
            <PrettyText>Server error.</PrettyText>
        </View>
    } else if (loading === true) {
        return <PrettyIndicator />;
    } else if (loading === false && products.length <= 0) {
        return <View style={css.center}>
            <PrettyText>No products at the moment.</PrettyText>
        </View>
    }

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