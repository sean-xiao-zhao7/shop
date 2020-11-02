import React, { useEffect } from 'react';
import { AsyncStorage } from 'react-native';

// comps
import Spinner from '../../components/styles/PrettyIndicator';

// redux
import { useDispatch } from 'react-redux';
import { autoLoginAction } from '../../store/actions/auth';

const AutoLogin = props => {
    const dispatch = useDispatch();

    useEffect(() => {
        const tryLogin = async () => {
            const raw = await AsyncStorage.getItem('shopAuthData');
            if (!raw) {
                props.navigation.navigate('Auth');
                return;
            } else {
                const shopAuthData = JSON.parse(raw);
                const { userToken, userId, expire } = shopAuthData;
                const expireDate = new Date(expire);

                if (expireDate <= new Date() || !userToken || !userId) {
                    props.navigation.navigate('Auth');
                    return;
                } else {
                    const autoLogoutTime = expireDate.getTime() - new Date().getTime(); 

                    dispatch(autoLoginAction(userId, userToken, autoLogoutTime));
                    props.navigation.navigate('Shop');
                    return;
                }
            }
        };

        tryLogin();
    }, [dispatch])

    return (
        <Spinner />
    );
};

export default AutoLogin;
