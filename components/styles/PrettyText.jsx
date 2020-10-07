import React from 'react';
import { Text, StyleSheet } from 'react-native';

const PrettyText = props => {
    return (
        <Text style={{...props.style, ...styles.text}}>
            {props.children}
        </Text>
    );
}

const styles = StyleSheet.create({
    text: {
        fontFamily: 'open-sans',
        fontSize: 18
    }
});

export default PrettyText;