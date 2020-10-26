import React, { useCallback, useState } from 'react';
import { Button, ScrollView, View, StyleSheet, Alert } from 'react-native';

// comps
import PrettyText from '../../components/styles/PrettyText';
import PrettyIndicator from '../../components/styles/PrettyIndicator';

// redux
import { useSelector, useDispatch } from 'react-redux';
import Colors from '../../styles/colors';
import CartItem from '../../components/shop/CartItem';
import * as actions from '../../store/actions/orders';

// styles
import css from '../../styles/css';

const CartScreen = props => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const totalAmount = useSelector(state => state.cart.totalAmount);
    const items = useSelector(state => {
        const array = [];
        for (const key in state.cart.items) {
            array.push({
                id: key,
                content: state.cart.items[key]
            })
        };
        return array.sort((a, b) => a.id > b.id ? 1 : -1);
    });

    const placeOrderHandler = useCallback(async () => {
        setLoading(true);
        try {
            await dispatch(actions.addOrder(items, totalAmount));
            Alert.alert(
                `Your order has been placed.`,
                '',
                [{
                    text: 'Return to cart',
                    onPress: () => { },
                    style: 'cancel'
                }]
            );
        } catch (err) {
            console.log(err.message);
            setError(err.message);
        }
        setLoading(false);
    }, [items, totalAmount]);

    return (
        <ScrollView>
            <View style={styles.screen}>
                <View style={css.paper}>
                    <PrettyText>
                        Total: <PrettyText style={{ color: Colors.primary }}>$ {totalAmount.toFixed(2)}</PrettyText>
                    </PrettyText>
                    {loading ? <PrettyIndicator />
                        : <Button title={'Finalize Order'} disabled={items.length <= 0} color={Colors.primary}
                        onPress={placeOrderHandler}
                    />}
                </View>
                <View style={{ alignItems: 'center' }}>
                    <PrettyText style={{ fontSize: 20, marginVertical: 20, color: Colors.primary }}>Cart Items</PrettyText>
                    {
                        items.map((item, index) => {
                            return <CartItem item={item} key={index} deletable={true} />
                        })
                    }
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    screen: {
        margin: 20,
    },
});

CartScreen.navigationOptions = {
    headerTitle: 'Cart'
};

export default CartScreen;