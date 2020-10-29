import { REGISTER, LOGIN } from '../actions/auth';

const init = {
    token: null,
    userId: null,
};

export default (state = init, action) => {
    switch (action.type) {
        case REGISTER:
            return {
                ...state,
                token: action.token,
                userId: action.userId,
            };
        case LOGIN:
            return {
                ...state,
                token: action.token,
                userId: action.userId,
            };
        default:
            return state;
    }
}