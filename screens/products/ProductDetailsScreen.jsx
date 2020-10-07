import React from 'react';
import { ScrollView, View, Image, Button } from 'react-native';

// comps
import PrettyText from '../../components/styles/PrettyText';

// redux
import { useSelector, useDispatch } from 'react-redux';
import * as cartActions from '../../store/actions/cart';

// styles
import Colors from '../../styles/colors';

const ProductDetailsScreen = props => {
    const productId = props.navigation.getParam('productId');
    const selectedProduct = useSelector(state => state.products.availableProducts.find(product => product.id === productId));
    const dispatch = useDispatch();

    return (
        <ScrollView contentContainerStyle={{backgroundColor: 'white', flex: 1}}>
            <Image source={{uri: selectedProduct.imageUrl}} style={{width: '100%', height: 400}} />
            <View style={{margin: 15}}>
                <View style={{alignItems: 'center'}}>
                    <Button 
                        title={'Add to Cart'} 
                        color={Colors.primary}
                        onPress={() => {
                            dispatch(cartActions.addToCart(selectedProduct))
                        }}
                        style={{fontSize: 20}}
                    />
                </View>            
                <View style={{alignItems: 'center', marginVertical: 10}}>
                    <PrettyText style={{fontSize: 20, color: '#888'}}>$ {selectedProduct.price.toFixed(2)}</PrettyText>
                </View>
                <PrettyText style={{fontSize: 18}}>{selectedProduct.description}</PrettyText>
            </View>
        </ScrollView>
    );
};

ProductDetailsScreen.navigationOptions = navData => {
    return {
        headerTitle: navData.navigation.getParam('productTitle')
    };
}

export default ProductDetailsScreen;