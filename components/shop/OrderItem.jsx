import React, { useState } from 'react';
import { View, Button } from 'react-native';

// comps
import PrettyText from '../styles/PrettyText';
import CartItem from './CartItem';

// styles
import styles from '../../styles/css';
import colors from '../../styles/colors';

const OrderItem = props => {
    const [showDetails, setShowDetails] = useState(false);

    return (
        <View style={{padding: 10}}>
            <View style={{...styles.paper, flexDirection: 'column'}}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <PrettyText style={{marginRight: 10}}>$ {props.totalAmount.toFixed(2)}</PrettyText>
                    <PrettyText>{props.date}</PrettyText>
                </View>
                <Button title='Toggle Details' color={colors.primary} onPress={
                    () => {
                        setShowDetails(prevState => !prevState);
                    }
                }/>
                {showDetails && <View style={{width: '100%'}}>
                    {props.items.map((cartItem, i) => <CartItem item={cartItem} deletable={false} key={i}/>)}
                </View>}
            </View>
        </View>
    );
}

export default OrderItem;