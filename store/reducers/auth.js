import { AUTO_LOGIN, LOGOUT } from '../actions/auth';

const init = {
    token: null,
    userId: null,
};

export default (state = init, action) => {
    switch (action.type) {
        case AUTO_LOGIN:
            return {
                ...state,
                token: action.userToken,
                userId: action.userId,
            };
        case LOGOUT:
            return init;
        default:
            return state;
    }
}