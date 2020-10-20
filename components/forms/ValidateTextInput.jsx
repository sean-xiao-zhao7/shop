import React, { useReducer, useEffect } from 'react';
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
                isValid: isValid
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
    const [inputState, dispatch] = useReducer(inputReducer, {
        value: props.initialValue ? props.initialValue : '',
        isValid: props.initiallyValid,
        touched: false,
    });

    const { onInputChange } = props;

    useEffect(() => {
        if (inputState.touched) {
            props.onInputChange(inputState.value, inputState.isValid);
        }
    }, [inputState, onInputChange]);

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

    const lostFocusHandler = () => {
        dispatch({type: INPUT_BLUR});
    }

    return (
        <View style={props.contentContainerStyle}>
            <PrettyText>{props.title}</PrettyText>
            <TextInput
                {...props}
                style={props.inputStyle}
                value={inputState.value}
                onChangeText={textChangeHandler}
                onBlur={lostFocusHandler}
            />
            {!inputState.isValid && <PrettyText>{props.error}</PrettyText>}
        </View>
    );
};

export default ValidateTextInput;