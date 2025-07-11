import React, { useEffect, useState } from 'react';
import './UI.css';

function Ui() {
    const [city, setCity] = useState('mumbai');
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(null);

    const currentDate = new Date();
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const month = months[currentDate.getMonth()];
    const day = currentDate.getDate();
    const year = currentDate.getFullYear();
    const formattedDate = `${day} ${month} ${year}`;
    const API_KEY = '54bbf2a1c6daddb567e4ae74da15fa35';

    const fetchWeatherData = async () => {
        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
            );
            const data = await response.json();
            if (data.cod === 200) {
                setWeatherData(data);
                setError(null);
            } else {
                setWeatherData(null);
                setError('City not found. Please enter a valid city name.');
            }
        } catch (error) {
            console.log(error);
            setWeatherData(null);
            setError('Something went wrong. Please try again later.');
        }
    };

    useEffect(() => {
        fetchWeatherData();
    }, []);

    const handleInputChange = (e) => {
        setCity(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchWeatherData();
        setCity('');
    };

    return (
        <div>
            <div className='container12'>
                <div className='weather-card'>
                    <h4 className='weather-date'>{formattedDate}</h4>
                    <div className='weather-data'>
                        {error && <p className="error-message">{error}</p>}
                        {weatherData && !error && (
                            <>
                                <h3 className='weather-city'>{weatherData.name}</h3>
                                <h2 className='weather-degree'>
                                    {Math.round(weatherData.main.temp - 273.15)}°C
                                </h2>
                                <p className='weather-para'>
                                    {weatherData.weather[0].main}
                                </p>
                            </>
                        )}
                        <form className='weather-input' onSubmit={handleSubmit}>
                            <input
                                type='text'
                                className='input-data'
                                placeholder='Enter your city'
                                onChange={handleInputChange}
                                value={city}
                            />
                            <button type='submit' className='input-btn'>Get</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Ui;
