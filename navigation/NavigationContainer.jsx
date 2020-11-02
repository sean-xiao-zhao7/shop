import React, { useEffect, useRef } from 'react';
import ShopNavigator from './ShopNavigator';
import { NavigationActions } from 'react-navigation';

// redux
import { useSelector } from 'react-redux';

const NavigationContainer = props => {
    const navRef = useRef();
    const loggedIn = useSelector(state => !!state.auth.token);

    useEffect(() => {
        if (!loggedIn) {
            navRef.current.dispatch(
                NavigationActions.navigate({routeName: 'Login'})
            );
        }
    }, [loggedIn])

    return <ShopNavigator ref={navRef} />;
};

export default NavigationContainer;