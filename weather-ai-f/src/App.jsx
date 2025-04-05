import {useReducer, useState, useRef, useEffect} from 'react';
import {appReducer, initialState} from './functions/appReducer.js';
import {weatherToIcon} from "./functions/weatherToIcon.js";
import {angleToDirection} from "./functions/angleToDirection.js";
import axios from 'axios';
import './styles/App.sass'
import {BASE_API_URL} from "../utils/config.js";

function App() {
    const inputRef = useRef(null);
    const [state, dispatch] = useReducer(appReducer, initialState);
    const [isFocused, setIsFocused] = useState(false);
    const [darkMode, setDarkMode] = useState(() => {
        const saved = localStorage.getItem('darkMode');
        return saved === 'true';
    });

    useEffect(() => {
        localStorage.setItem('darkMode', darkMode.toString());
    }, [darkMode]);

    const handleSubmit = async (loc) => {
        if (!loc) return;


        dispatch({type: 'SET_LOADING', payload: true});

        try {
            const response = await axios.get(`${BASE_API_URL}`, {
                params: {location: loc},
            });

            const icon = weatherToIcon(
                response.data.weather.weather[0].main,
                response.data.weather.dt,
                response.data.weather.sys.sunrise,
                response.data.weather.sys.sunset,
                response.data.weather.timezone
            );

            dispatch({
                type: 'SET_RESULT',
                payload: {
                    tip: response.data.tip,
                    weather: response.data.weather,
                    iconPath: icon
                }
            });

        } catch (error) {
            dispatch({type: 'SET_ERROR', payload: 'Something went wrong, please try again'});
        } finally {
            dispatch({type: 'SET_LOADING', payload: false})
        }
    };

    return (
        <div className={`App${darkMode ? ' dark' : ''}`}>
            {/* Dark Mode Button */}
            <div className="toggleSwitch">
                <input
                    type="checkbox"
                    className="toggleMode"
                    id="toggleSwitch"
                    checked={darkMode}
                    onChange={() => setDarkMode(prev => !prev)}
                    aria-label="Toggle Dark Mode"
                />
                <label className="toggle-switch-label" htmlFor="toggleSwitch">
                    <span className="toggle-switch-inner"/>
                    <span className="toggle-switch-switch"/>
                </label>
            </div>

            {/* Input container */}
            <input
                ref={inputRef}
                type="text"
                className={`input ${(state.result && !state.error && !isFocused) ? 'result' : ''}`}
                placeholder={state.loading ? "Loading data..." : "Type your city..."}
                value={state.loading ? "" : state.location}
                onChange={(e) => {
                    dispatch({type: 'SET_LOCATION', payload: e.target.value});
                    if (state.error) dispatch({type: 'SET_ERROR', payload: null});
                }}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onKeyDown={async (e) => {
                    if (e.key === "Enter" && !state.loading) {
                        e.preventDefault();
                        inputRef.current?.blur();
                        await handleSubmit(state.location);
                    }
                }}
                disabled={state.loading}
            />

            {/*All info about the city*/}
            {state.error && !isFocused && (
                <div className="error-message">
                    <p>{state.error}</p>
                </div>
            )}

            {state.result && !isFocused && (
                <div className="result">
                    <div className="header">
                        <div className="city-name">
                            <h1>{state.weather.locationName}</h1>
                        </div>

                        <div className="weather-info">
                            <h2>{state.weather.weather[0].main}</h2>
                            <img className="icon" src={state.iconPath}/>
                        </div>
                    </div>

                    <div className="main-info">
                        <h2>Current Temperature: {Math.round(state.weather.main.temp)}°C</h2>
                        <h2>Wind speed: {Math.round(state.weather.wind.speed * 3.6)} km/h</h2>
                    </div>

                    <div className="additional-info">
                        <h4>Feels like: {Math.round(state.weather.main.feels_like)}°C</h4>
                        <h4>Wind direction: {angleToDirection(state.weather.wind.deg)}</h4>
                    </div>

                    <div className="tip">
                        <h3>Tip: {state.tip.tip}</h3>
                    </div>

                    <div className="date">
                        <h4>{new Date(state.tip.date).toLocaleString('en', {
                            day: '2-digit',
                            month: 'long',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                        })}</h4>
                    </div>
                </div>
            )}
        </div>
    );
}

export default App
