import React from 'react';
import { FlatList, Button, Alert } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

// comps
import ProductItem from '../../components/shop/ProductItem';
import MyHeaderButton from '../../components/header/MyHeaderButton';

// redux
import { useSelector, useDispatch } from 'react-redux';
import { deleteProduct } from '../../store/actions/products';

// styles
import colors from '../../styles/colors';

const UserProductsScreen = props => {
    const userProducts = useSelector(state => state.products.userProducts);
    const dispatch = useDispatch();

    const renderItem = (itemData) => {
        return <ProductItem
            imageUrl={itemData.item.imageUrl}
            title={itemData.item.title}
            price={itemData.item.price}
            onSelect={() => props.navigation.navigate('EditProduct', { productId: itemData.item.id })}
        >
            <Button title='Edit' color={colors.primary} onPress={() => {
                props.navigation.navigate('EditProduct', { productId: itemData.item.id })
            }} />
            <Button title='Delete' color={colors.primary} onPress={() => popup(itemData.item.id)} />
        </ProductItem>
    };

    const popup = (id) => {
        Alert.alert(
            'Delete?',
            'Confirm.',
            [
                {
                    text: 'No',
                    style: 'default',
                },
                {
                    text: "Yes",
                    style: 'destructive',
                    onPress: () => {
                        dispatch(deleteProduct(id))
                    }
                }
            ]
        );
    };

    return (
        <FlatList
            keyExtractor={product => product.id}
            data={userProducts}
            renderItem={renderItem}
        />
    )
};

UserProductsScreen.navigationOptions = (navData) => {
    return {
        headerTitle: 'Manage Products',
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
        headerRight: () =>
            <HeaderButtons HeaderButtonComponent={MyHeaderButton}>
                <Item
                    title='Add Product'
                    iconName={Platform.OS === 'android' ? 'md-add-circle' : 'ios-add-circle'}
                    onPress={() => {
                        navData.navigation.navigate('EditProduct')
                    }}
                />
            </HeaderButtons>,
    };
};


export default UserProductsScreen;