import React from 'react';
import { FlatList } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

// comps
import PrettyText from '../../components/styles/PrettyText';
import MyHeaderButton from '../../components/header/MyHeaderButton';

// redux
import { useSelector } from 'react-redux';

const OrdersScreen = props => {
    const orders = useSelector(state => state.orders.orders);

    const renderOrder = (itemData) => {
        return (
            <PrettyText>{itemData.item.title}</PrettyText>
        );
    };

    return (
        <FlatList
            data={orders}
            renderItem={renderOrder}
        />
    );
};

OrdersScreen.navigationOptions = (navData) => {
    return {
        headerTitle: 'Orders',
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
    };
};

export default OrdersScreen;