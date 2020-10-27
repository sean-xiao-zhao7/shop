export const REGISTER = 'REGISTER';

export const registerAction = (email, password) => {
    return async dispatch => {
        const response = fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyASvEZQkwBvhI5Bp2XvvjSfmSXLR30XUEE',
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
            throw new Error('Firebase failed to validate auth.');
        }

        const resData = await response.json();

        dispatch({
            type: REGISTER,

        });
    };
};