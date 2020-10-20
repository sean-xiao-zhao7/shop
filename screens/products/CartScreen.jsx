import React from 'react';
import { Button, ScrollView, View, StyleSheet, Platform } from 'react-native';

// comps
import PrettyText from '../../components/styles/PrettyText';

// redux
import { useSelector, useDispatch } from 'react-redux';
import Colors from '../../styles/colors';
import CartItem from '../../components/shop/CartItem';
import * as actions from '../../store/actions/orders';

// styles
import css from '../../styles/css';

const CartScreen = props => {
    const dispatch = useDispatch();

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

    return (
        <ScrollView>
            <View style={styles.screen}>
                <View style={css.paper}>
                    <PrettyText>
                        Total: <PrettyText style={{ color: Colors.primary }}>$ {totalAmount.toFixed(2)}</PrettyText>
                    </PrettyText>
                    <Button title={'Order Now'} disabled={items.length <= 0} color={Colors.primary}
                        onPress={() => {
                            dispatch(actions.addOrder(items, totalAmount));
                        }}
                    />
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