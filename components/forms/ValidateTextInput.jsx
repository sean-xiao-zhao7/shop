import React, { useReducer, useEffect, useCallback } from 'react';
import { TextInput, View } from 'react-native';

// comps
import PrettyText from '../styles/PrettyText';

const INPUT_CHANGE = 'INPUT_CHANGE';
const INPUT_BLUR = 'INPUT_BLUR';

const inputReducer = (state, action) => {    
    switch (action.type) {
        case INPUT_CHANGE:
            return {
                ...state,
                value: action.value,
                isValid: action.isValid,
                touched: false,
            };
        case INPUT_BLUR:
            return {
                ...state,
                touched: true,
            };
        default:
            return state;
    };
};

const ValidateTextInput = props => {
    let initialValue = props.initialValue;
    if (!initialValue) {
        if (props.type === 'price') {
            initialValue = 0;
        } else {
            initialValue = '';
        }
    } else if (props.type === 'price') {
        initialValue = initialValue.toFixed(2);
    }

    const [inputState, dispatch] = useReducer(inputReducer, {
        value: initialValue,
        isValid: props.initiallyValid,
        touched: false,
    });

    const { onInputChange, type } = props;

    useEffect(() => {
        if (inputState.touched) {
            props.onInputChange(type, inputState.value, inputState.isValid);
        }
    }, [inputState, onInputChange, type]);

    const textChangeHandler = text => {
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let isValid = true;
        if (props.required && text.trim().length === 0) {
            isValid = false;
        }
        if (props.email && !emailRegex.test(text.toLowerCase())) {
            isValid = false;
        }
        if (props.min != null && +text < props.min) {
            isValid = false;
        }
        if (props.max != null && +text > props.max) {
            isValid = false;
        }
        if (props.minLength != null && text.length < props.minLength) {
            isValid = false;
        }

        dispatch({
            type: INPUT_CHANGE,
            value: text,
            isValid: isValid,
        })
    };

    return (
        <View style={props.contentContainerStyle}>
            <PrettyText>{props.title}</PrettyText>
            <TextInput
                {...props}
                style={props.inputStyle}
                value={inputState.value}
                onChangeText={textChangeHandler}
                onBlur={() => {
                    dispatch({type: INPUT_BLUR});
                }}
            />
            {!inputState.isValid && <PrettyText>{props.error}</PrettyText>}
        </View>
    );
};

export default ValidateTextInput;