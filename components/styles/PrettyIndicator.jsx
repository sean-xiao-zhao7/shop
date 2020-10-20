import React from 'react';
import { View, ActivityIndicator } from 'react-native';

// styles
import colors from '../../styles/colors';

const PrettyIndicator = props => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator color={colors.primary} size={"large"} />
        </View>
    );
};

export default PrettyIndicator;