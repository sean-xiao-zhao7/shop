import React, { useCallback, useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

// comps
import MyHeaderButton from '../../components/header/MyHeaderButton';
import OrderItem from '../../components/shop/OrderItem';
import PrettyIndicator from '../../components/styles/PrettyIndicator';

// redux
import { useSelector, useDispatch } from 'react-redux';
import { fetchOrders } from '../../store/actions/orders';

const OrdersScreen = props => {
    const dispatch = useDispatch();

    // states
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // load orders
    const loadOrders = useCallback(() => {
        setLoading(true);
        dispatch(fetchOrders()).then(() => {
            setLoading(false);
        }).catch((e) => {
            setError(e.message);
            setLoading(false);
        });        
    }, [dispatch, setLoading])

    useEffect(() => {
        loadOrders();
    }, [dispatch]);

    useEffect(() => {
        const willFocusSub = props.navigation.addListener('willFocus', loadOrders);
        return () => {
            willFocusSub.remove();
        }
    }, [loadOrders]);

    const orders = useSelector(state => state.orders.orders);

    // funcs
    const renderOrder = (itemData) => {
        return (
            <OrderItem totalAmount={itemData.item.totalAmount} date={itemData.item.readableDate} items={itemData.item.items} />
        );
    };    

    if (loading) {
        return <PrettyIndicator />;
    }

    return (
        <FlatList
            data={orders}
            renderItem={renderOrder}
            onRefresh={loadOrders}
            refreshing={loading}
        />
    );
};


// header
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