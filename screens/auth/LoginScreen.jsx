import React, { useReducer, useCallback, useState } from 'react';
import { ScrollView, View, KeyboardAvoidingView, Button, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

// redux
import { registerAction, loginAction } from '../../store/actions/auth';
import { useDispatch } from 'react-redux';

// comps
import ValidateTextInput from '../../components/forms/ValidateTextInput';
import PrettyIndicator from '../../components/styles/PrettyIndicator';

// styles
import colors from '../../styles/colors';
import PrettyText from '../../components/styles/PrettyText';

// form validation reducer
const UPDATE_LOGIN_FORM = 'UPDATE_LOGIN_FORM';
const loginReducer = (state, action) => {
    switch (action.type) {
        case UPDATE_LOGIN_FORM:
            const newValues = {
                ...state.values,
                [action.fieldType]: action.value
            };

            const newValids = {
                ...state.valids,
                [action.fieldType]: action.isValid
            }

            let newAllValid = true;
            for (const key in newValids) {
                newAllValid = newValids[key] && newAllValid;
            }

            return {
                values: newValues,
                valids: newValids,
                allValid: newAllValid,
            };
        default:
            return state;
    }
};

const LoginScreen = props => {
    const dispatch = useDispatch();

    // states
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

     // use reducer
     const [formState, dispatchFormState] = useReducer(loginReducer, {
        values: {
            email: '',
            password: '',
        },
        valids: {
            email: false,
            password: false
        },
        allValid: false,
    });

    // funcs
    const loginHandler = useCallback(async () => {        
        try {            
            setLoading(true);
            await dispatch(loginAction(formState.values.email, formState.values.password));
            props.navigation.navigate('Shop');
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }        
    }, [formState]);

    const registerHandler = useCallback(async () => {
        setLoading(true);
        try {            
            await dispatch(registerAction(formState.values.email, formState.values.password));  
            props.navigation.navigate('Shop');
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }        
    }, [formState]);

    const inputChangeHandler = useCallback((fieldType, value, isValid) => {
        dispatchFormState({
            type: UPDATE_LOGIN_FORM,
            value: value,
            isValid: isValid,
            fieldType: fieldType
        });
    }, [dispatchFormState]);

    // loading
    if (loading) {
        return <PrettyIndicator />;
    }

    return (
        <KeyboardAvoidingView
            behavior='padding'
            keyboardVerticalOffset={50}
            style={{ backgroundColor: 'white', flex: 1 }}
        >
            <LinearGradient
                colors={
                    [
                        'white',
                        '#cddccc'
                    ]
                }
            >
                <ScrollView
                    contentContainerStyle={{ padding: 10, paddingHorizontal: 40, height: '100%' }}
                >
                    <ValidateTextInput
                        id='email'
                        label='Email'
                        keyboardType='email-address'
                        required
                        email
                        autoCapitalize='none'
                        error='Please enter a valid email.'
                        onInputChange={inputChangeHandler}
                        initialValue={formState.values.email}
                        inputStyle={styles.loginField}
                        initiallyValid
                        placeholder='Email'
                        type={'email'}
                        value={formState.values.email}
                    />
                    <ValidateTextInput
                        id='password'
                        label='Password'
                        keyboardType='default'
                        secureTextEntry
                        required
                        password
                        minLength={8}
                        autoCapitalize='none'
                        error='Please enter at least 8 characters.'
                        onInputChange={inputChangeHandler}
                        initialValue={formState.values.password}
                        inputStyle={styles.loginField}
                        initiallyValid
                        placeholder='Password'
                        type={'password'}
                        value={formState.values.password}
                    />
                    <Button
                        title='Login to your account'
                        color={colors.primary}
                        onPress={loginHandler}
                    />
                    <Button
                        title='Register now'
                        color={colors.primary}
                        onPress={registerHandler}
                    />
                    {error ? <PrettyText>{error}</PrettyText> : null}
                </ScrollView>
            </LinearGradient>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    loginField: {
        fontSize: 18,
        borderColor: 'black',
        height: 30,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1
    }
});

export default LoginScreen;