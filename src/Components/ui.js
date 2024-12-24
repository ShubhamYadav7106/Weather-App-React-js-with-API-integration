import React, { useEffect, useState } from 'react'
import './ui.css'

function Ui() {
    const [city, setCity] = useState('mumbai')
    const [weatherData, setWeatherData] = useState(null)
    const currentDate = new Date();
    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'Jun',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];
    const month = months[currentDate.getMonth()];
    const day = [currentDate.getDate()];
    const year = [currentDate.getFullYear()];
    const formattedDater = `${day} ${month} ${year}`
    const API_KEY = '54bbf2a1c6daddb567e4ae74da15fa35';
    const fetchWeatherData = async () => {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);
            const data = await response.json();
            console.log(data)
            setWeatherData(data)
        } catch (error) {
            console.log(error)

        }
    }
   
    useEffect(() => {
        fetchWeatherData()
    }, [])

    const handleInputChange = (e) => {
        console.log(e.target.value)
        setCity(e.target.value)
    }
 
    
    const handleSubmit = (e) => {
        e.preventDefault();
        fetchWeatherData();
        
    }
    
    
    return (
        <div>
            <div className='container12'>
                <div className='weather-card'>
                    {weatherData &&
                        <>
                            <h4 className='weather-date'>{formattedDater}</h4>
                            <div className='weather-data'>
                                <h3 className='weather-city'>
                                    {weatherData.name}
                                </h3>
                                {/* <img src='/ls' alt='img not loaded...'/> */}
                                <h2 className='weather-degree' >{weatherData.main.temp}</h2>
                                <p className='weather-para' >{weatherData.weather[0].main}</p>

                                <form className='weather-input' onSubmit={handleSubmit}>
                                    <input type='text' className='input-data' placeholder='Enter Your city' onChange={handleInputChange} />

                                    <button type='submit' className='input-btn'
                                    >Get</button>
                                </form>
                            </div>

                        </>
                    }
                </div>

            </div>
        </div>
    )
}

export default Ui;



