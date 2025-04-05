export const initialState = {
    location: '',
    tip: '',
    weather: null,
    loading: false,
    result: false,
    error: null,
    iconPath: null,
};

export function appReducer(state, action) {
    switch (action.type) {
        case 'SET_LOADING':
            return {...state, loading: action.payload};
        case 'SET_LOCATION':
            return {...state, location: action.payload};
        case 'SET_RESULT':
            return {
                ...state,
                location: '',
                tip: action.payload.tip,
                weather: action.payload.weather,
                iconPath: action.payload.iconPath,
                loading: false,
                result: true,
                error: null
            };
        case 'SET_ERROR':
            return {
                ...state,
                location: '',
                tip: '',
                weather: null,
                result: false,
                loading: false,
                iconPath: null,
                error: action.payload
            };
        default:
            return state;
    }
}