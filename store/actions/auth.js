import { AsyncStorage } from 'react-native';

export const AUTO_LOGIN = 'AUTO_LOGIN';
export const LOGOUT = 'LOGOUT';

let timer;

const saveOnDevice = (userToken, userId, expire) => {
    AsyncStorage.setItem('shopAuthData', JSON.stringify({
        userToken: userToken,
        userId: userId,
        expire: expire.toISOString(),
    }));
}

export const registerAction = (email, password) => {
    return async dispatch => {
        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyASvEZQkwBvhI5Bp2XvvjSfmSXLR30XUEE',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    returnSecureToken: true
                })
            }
        );

        if (!response.ok) {
            const errorData = await response.json();
            console.log(errorData)
            throw new Error(errorData.error.message);
        }

        const resData = await response.json();

        dispatch(autoLoginAction(resData.localId, resData.idToken, parseInt(resData.expiresIn) * 1000));

        // auto login after restart
        const expire = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000);
        saveOnDevice(resData.idToken, resData.localId, expire);
    };
};

export const loginAction = (email, password) => {
    return async dispatch => {
        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyASvEZQkwBvhI5Bp2XvvjSfmSXLR30XUEE',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    returnSecureToken: true
                })
            }
        );

        if (!response.ok) {
            const errorData = await response.json();
            console.log(errorData)
            throw new Error(errorData.error.message);
        }

        const resData = await response.json();

        dispatch(autoLoginAction(resData.localId, resData.idToken, parseInt(resData.expiresIn) * 1000));

        // auto login after restart
        const expire = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000);
        saveOnDevice(resData.idToken, resData.localId, expire);
    };
};

export const autoLoginAction = (userId, userToken, expireTime) => {
    return dispatch => {
        dispatch(setLogoutTimer(expireTime));
        dispatch({
            type: AUTO_LOGIN,
            userToken: userToken,
            userId: userId,
        })
    };
};

export const logoutAction = () => {
    clearLogoutTimer();
    AsyncStorage.removeItem('shopAuthData');
    return {
        type: LOGOUT,
    };
};

const setLogoutTimer = expireTime => {
    return dispatch => {
        timer = setTimeout(() => {
            dispatch(logoutAction());
        }, expireTime);
    }
};

const clearLogoutTimer = () => {
    if (timer) {
        clearTimeout(timer);
    }
};