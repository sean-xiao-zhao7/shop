import React, { useEffect, useCallback, useReducer } from 'react';
import { ScrollView, TextInput, View, StyleSheet, Alert } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

// redux
import { useSelector, useDispatch } from 'react-redux';
import { addProduct, editProduct } from '../../store/actions/products';

// comps
import PrettyText from '../../components/styles/PrettyText';
import MyHeaderButton from '../../components/header/MyHeaderButton';
import ValidateTextInput from '../../components/forms/ValidateTextInput';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';
const formReducer = (state, action) => {
    if (action.type === FORM_INPUT_UPDATE) {
        // update values
        const updatedValues = {
            ...state.inputValues,
            [action.input]: action.value,
        };
        // update validities        
        const updatedValidaties = {
            ...state.inputValidities,
            [action.input]: action.isValid,
        }

        // update overall validity
        let updatedFormIsValid = true;
        for (const key in updatedValidaties) {
            updatedFormIsValid = updatedFormIsValid && updatedValidaties[key];
        }
        return {
            ...state,
            inputValues: updatedValues,
            inputValidities: updatedValidaties,
            formIsValid: updatedFormIsValid,
        }
    }

    return state;
};

const EditProductScreen = props => {
    const dispatch = useDispatch();
    const productId = props.navigation.getParam('productId');
    const products = useSelector(state => state.products.userProducts);
    let currentProduct;
    if (productId) {
        currentProduct = products.find(p => p.id === productId);
    }

    // form valid reducer
    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            title: currentProduct ? currentProduct.title : '',
            price: currentProduct ? currentProduct.price.toFixed(2) : 0,
            description: currentProduct ? currentProduct.description : '',
            imageUrl: currentProduct ? currentProduct.imageUrl : '',
        },
        inputValidities: {
            title: currentProduct ? true : false,
            description: currentProduct ? true : false,
            price: currentProduct ? true : false,
            imageUrl: currentProduct ? true : false,
        },
        formIsValid: currentProduct ? true : false,
    });

    const inputChangeHandler = useCallback((type, value, isValid) => {
        dispatchFormState({
            type: FORM_INPUT_UPDATE,
            value: value,
            isValid: isValid,
            input: type
        });
    }, [dispatchFormState]);

    useEffect(() => {
        if (productId) {
            props.navigation.setParams({
                title: currentProduct.title,
                price: Math.round(currentProduct.price * 100) / 100,
                description: currentProduct.description,
                imageUrl: currentProduct.imageUrl,
            });
        }
    }, [productId]);

    const submitHandler = useCallback(() => {
        if (!formState.formIsValid) {
            Alert.alert(
                'Invalid input',
                'Please enter all info properly.',
                {
                    text: 'Ok'
                }
            )
            return;
        }
        if (!productId) {
            dispatch(addProduct(formState.inputValues.title, formState.inputValues.description, formState.inputValues.imageUrl, formState.inputValues.price));
        } else {
            dispatch(editProduct(productId, formState.inputValues.title, formState.inputValues.description, formState.inputValues.imageUrl, formState.inputValues.price));
        }
    }, [productId, formState]);

    useEffect(() => {
        props.navigation.setParams({ submitHandler: submitHandler });
    }, [submitHandler])

    return (
        <ScrollView contentContainerStyle={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{ margin: 10, padding: 10 }}>                
                <ValidateTextInput
                    contentContainerStyle={styles.inputgroup}
                    inputStyle={styles.textinput}
                    title={'Title'}
                    error={'Please enter a valid title.'}
                    keyboardType='default'
                    autoCapitalize="sentences"
                    returnKeyType='next'
                    onInputChange={inputChangeHandler}
                    initialValue={currentProduct ? currentProduct.title : ''}
                    initiallyValid={!!currentProduct}
                    required
                    type={'title'}
                />
                <ValidateTextInput
                    contentContainerStyle={styles.inputgroup}
                    inputStyle={styles.textinput}
                    title={'Price'}
                    error={'Please enter a valid price.'}
                    keyboardType='decimal-pad'
                    autoCapitalize="sentences"
                    returnKeyType='next'
                    onInputChange={inputChangeHandler}
                    initialValue={currentProduct ? currentProduct.price : ''}
                    initiallyValid={!!currentProduct}
                    type={'price'}
                />
                <ValidateTextInput
                    contentContainerStyle={styles.inputgroup}
                    inputStyle={styles.textinput}
                    title={'Description'}
                    error={'Please enter a valid description.'}
                    keyboardType='default'
                    autoCapitalize="sentences"
                    returnKeyType='next'
                    onInputChange={inputChangeHandler}
                    initialValue={currentProduct ? currentProduct.description : ''}
                    initiallyValid={!!currentProduct}
                    type={'description'}
                />
                <ValidateTextInput
                    contentContainerStyle={styles.inputgroup}
                    inputStyle={styles.textinput}
                    title={'Image URL'}
                    error={'Please enter a valid image URL.'}
                    keyboardType='default'
                    autoCapitalize="sentences"
                    returnKeyType='next'
                    onInputChange={inputChangeHandler}
                    initialValue={currentProduct ? currentProduct.imageUrl : ''}
                    initiallyValid={!!currentProduct}
                    type={'imageUrl'}
                />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    textinput: {
        paddingVertical: 5,
        paddingHorizontal: 2,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
    },
    inputgroup: {
        width: '100%',
        marginBottom: 20
    }
});

EditProductScreen.navigationOptions = (navData) => {
    const productId = navData.navigation.getParam('productId');
    const submitHandler = navData.navigation.getParam('submitHandler');

    return {
        headerTitle: productId ? 'Edit Product' : 'Add Product',
        headerRight: () =>
            <HeaderButtons HeaderButtonComponent={MyHeaderButton}>
                <Item
                    title='Save'
                    iconName={Platform.OS === 'android' ? 'md-checkmark-circle' : 'ios-checkmark-circle'}
                    onPress={submitHandler}
                />
            </HeaderButtons>,
    };
};


export default EditProductScreen;