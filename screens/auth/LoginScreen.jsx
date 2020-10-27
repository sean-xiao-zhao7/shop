import React, { useReducer, useCallback } from 'react';
import { ScrollView, View, KeyboardAvoidingView, Button, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

// redux
import { registerAction } from '../../store/actions/auth';
import { useDispatch } from 'react-redux';

// comps
import ValidateTextInput from '../../components/forms/ValidateTextInput';

// styles
import colors from '../../styles/colors';

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

    // funcs
    const loginHandler = useCallback(() => {
        dispatch(registerAction(formState.values.email, formState.values.password));
    }, [formState]);

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

    const inputChangeHandler = useCallback((fieldType, value, isValid) => {
        dispatchFormState({
            type: UPDATE_LOGIN_FORM,
            value: value,
            isValid: isValid,
            fieldType: fieldType
        });
    }, [dispatchFormState]);

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
                        initialValue=''
                        inputStyle={styles.loginField}
                        initiallyValid
                        placeholder='Email'
                        type={'email'}
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
                        initialValue=''
                        inputStyle={styles.loginField}
                        initiallyValid
                        placeholder='Password'
                        type={'password'}
                    />
                    <Button
                        title='Login to your account'
                        color={colors.primary}
                        onPress={loginHandler}
                    />
                    <Button
                        title='Register now'
                        color={colors.primary}
                    />
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