import React from 'react';
import { View, Image, StyleSheet, Button, TouchableOpacity, TouchableNativeFeedback, Platform } from 'react-native';

// comps
import PrettyText from '../styles/PrettyText';

// styles
import Colors from '../../styles/colors';

const ProductItem = props => {
    let TouchableComp = TouchableOpacity;
    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableComp = TouchableNativeFeedback;
    }

    return (
        <View style={styles.shadowBox}>
            <View style={{ overflow: 'hidden', borderRadius: 10 }}>
                <TouchableComp onPress={props.onViewDetail} useForeground={true}>
                    <View>
                        <View style={{ overflow: 'hidden', height: '60%', width: '100%', overflow: 'hidden', borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>
                            <Image source={{ uri: props.imageUrl }} style={{ height: '100%', width: '100%' }} />
                        </View>
                        <View style={{ alignItems: 'center', height: '15%', padding: 10 }}>
                            <PrettyText style={{ fontSize: 18, marginVertical: 3 }}>{props.title}</PrettyText>
                            <PrettyText style={{ fontSize: 14, color: '#888' }}>$ {props.price.toFixed(2)}</PrettyText>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: '25%', paddingHorizontal: 20 }}>
                            <Button
                                title='View Details'
                                onPress={props.onViewDetail}
                                color={Colors.primary}
                            />
                            <Button
                                title='To Cart'
                                onPress={props.onToCart}
                                color={Colors.primary}
                            />
                        </View>
                    </View>
                </TouchableComp>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    shadowBox: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white',
        height: 300,
        margin: 20,
    }
});

export default ProductItem;