import React from 'react';
import { View, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// redux
import { useDispatch } from 'react-redux';
import * as actions from '../../store/actions/cart';

// comps
import PrettyText from '../styles/PrettyText';

// styles
import css from '../../styles/css';
import Colors from '../../styles/colors';

const CartItem = props => {
    const dispatch = useDispatch();

    return (
        <View style={{...props.style, ...css.paper, flexDirection: 'column', width: '100%', padding: 20, alignItems: 'flex-start' }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: 10 }}>
                <PrettyText style={{ color: Colors.primary }}>{props.item.content.productTitle}</PrettyText>
                <PrettyText>${props.item.content.productPrice}</PrettyText>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: 10 }}>
                <PrettyText>Quantity: {props.item.content.quantity}</PrettyText>
                <PrettyText>Total Cost: ${props.item.content.sum}</PrettyText>
            </View>
            {props.deletable && <TouchableOpacity
                style={{ width: '100%', justifyContent: 'center', flexDirection: 'row', justifyContent: 'center' }}
                onPress={() => {
                    dispatch(actions.deleteFromCart(props.item.id))
                }}
            >
                <PrettyText style={{ marginRight: 10, color: 'red' }}>Delete</PrettyText>
                <Ionicons
                    name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'}
                    size={30}
                    color='red'
                />
            </TouchableOpacity>}
        </View>
    );
};

export default CartItem;