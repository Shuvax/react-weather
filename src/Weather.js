import React, {useState} from 'react';
import axios from 'axios';
import moment from 'moment';
import './Weather.css';



function Weather() {

    const[temperature, setTemperature] = useState('');
    const[unit, setUnit] = useState('F');
    const[city, setCity] = useState('');
    const[country, setCountry] = useState('');
    const[description, setDescription] = useState('');
    const[date, setDate] = useState(moment().format('MMMM Do YYYY'));
    const[time, setTime] = useState(moment().format('h:mm:ss a'));
    const[humidity, setHumidity] = useState('');
    const[temp_min, setTemp_min] = useState('');
    const[temp_max, setTemp_max] = useState('');
    const[wind, setWind] = useState(null);
    const[icon, setIcon] = useState(null);

    function convert(deg) {
        let new_degree;
        switch(unit) {
            case 'F':
                new_degree = Math.round(((deg - 273.15) * 1.8) + 32)
                return new_degree
            case 'C':
                new_degree = Math.round(deg - 273.15) 
                return new_degree
            default:
                return
        }
    }


    const getWeather = (city, country) => {
        axios({
            method: "GET",
            url: `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&APPID=93d64353ca23a1e6ed6abb95e58c335c`
        })
            .then((response) => {
                setTemperature(Math.round(response.data.main.temp))
                setHumidity(response.data.main.humidity)
                setDescription(response.data.weather[0].description)
                setTime(moment().format('h:mm:ss a'))
                setDate(moment().format('MMMM DD YYYY'))
                setTemp_min(Math.round(response.data.main.temp_min));
                setTemp_max(Math.round(response.data.main.temp_max));
                setWind(response.data.wind)
                const iconName = response.data.weather[0].icon;
                const iconUrl = `http://openweathermap.org/img/wn/${iconName}@2x.png`;
                setIcon(iconUrl)
            })
            .catch((error) => {
                console.log(error);
            });
    };
    

    return (
        <div className='main'>
            <div className='section-wrapper'>
                <div className='time'>
                    <h1>{date}</h1>
                    <h1>{time}</h1>  
                </div>
                <div className='location'>
                    <h1><p>Weather in</p> {city ? `${city.toLocaleUpperCase()},` : <strong>City,</strong>} {country ? country.toUpperCase() : <strong>Country</strong>}</h1>
                </div>
                
                <div className='inputs-wrapper'>
                    <input 
                        className='input input_city'
                        type='text'
                        value={city}
                        onChange={(e) => e.target.value.length < 15 ? setCity(e.target.value) : ''}
                        placeholder='City '
                    />
                    <input 
                        className='input input_country'
                        type='text'
                        value={country}
                        onChange = {(e) => e.target.value.length < 15 ? setCountry(e.target.value) : ''}
                        placeholder='Country '
                    />
                    <div><button className='input_button' onClick={() => getWeather(city, country)}>Submit</button></div>
                </div>

                <div className='curr_weather_icon'>
                    <img style={{width: '80px'}} src={icon} />
                </div>

                <div className='description_wrapper'>
                    <p>{description}</p>
                </div>
                
                <div className='temp_wrapper'>
                    <h2>Temperature</h2>
                    <p className='temp'>{temperature ? convert(temperature)+'°'+unit : ''}</p>
                    <div className='unit_selector'>
                        <button className='unit_button c' value='C' onClick={() => setUnit('C')}>°C</button>
                        <button className='unit_button f' value='F' onClick={() => setUnit('F')}>°F</button>
                    </div>
                </div>

                <div className='wind_humid_wrapper'>
                    <div className='humidity_wrapper'>
                        <h2>Humidity</h2>
                        <p>{humidity ? `${humidity}%` : ''}</p>
                    </div>

                    <div className='wind_wrapper'>
                        <h2>Wind</h2>
                        <p>{wind ? `${wind.deg}° ${wind.speed}m/s` : ''}</p>
                    </div>
                </div>      

                <div className='min_max_wrapper'>
                    <div className='min_wrapper'>
                        <h2>Min</h2>
                        <p>{temp_min ? `${convert(temp_min)}°${unit}` : ''}</p>
                    </div>
                    <div className='max_wrapper'>
                        <h2>Max</h2>
                        <p>{temp_max ? `${convert(temp_max)}°${unit}` : ''}</p>
                    </div>
                </div>       
            </div>   
        </div>   
    )
}



export default Weather;