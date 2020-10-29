export const REGISTER = 'REGISTER';
export const LOGIN = 'LOGIN';

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

        dispatch({
            type: REGISTER,
            token: resData.idToken,
            userId: resData.localId,
        });
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

        dispatch({
            type: LOGIN,
            token: resData.idToken,
            userId: resData.localId,
        });
    };
};