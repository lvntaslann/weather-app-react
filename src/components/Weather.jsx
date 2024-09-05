import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'
import searchIcon from '../assets/search.png'
import clear from '../assets/clear.png'
import cloud from '../assets/cloud.png'
import drizzle from '../assets/drizzle.png'
import humidity from '../assets/humidity.png'
import rain from '../assets/rain.png'
import snow from '../assets/snow.png'
import wind from '../assets/wind.png'

const Weather = () => {
    const inputRef = useRef()
    const [weatherData,setWeatherData]=useState(false)
   //weather api sitesinde iconların içeriği mevcut
    const allIcons = {
        "01":clear,
        "01n":clear,
        "02d":cloud,
        "02n":cloud,
        "03d":cloud,
        "03n":cloud,
        "04d":drizzle,
        "04n":drizzle,
        "09d":rain,
        "09n":rain,
        "10d":rain,
        "10n":rain,
        "13d":snow,
        "13n":snow,
    }
    const search = async (city)=>{
        if(city ===""){
            alert("Enter city name");
            return;
        }
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
            const response = await fetch(url);
            const data = await response.json();
            if(!response.ok){
                alert(data.message);
                return;
            }
            const icon = allIcons[data.weather[0].icon] || clear;
            setWeatherData({
                humidity:data.main.humidity,
                wind:data.wind.speed,
                temperature:Math.floor(data.main.temp),
                location:data.name,
                icon:icon
            })

        } catch (error) {
            setWeatherData(false);
            console.error("Error in fetching weather data")
        }
    }

    useEffect(()=>{
        search("Minnesota");
    },[])


  return (
    <>
        <div className='weather'>
            <div className="search-bar">
                <input ref={inputRef} type="text" placeholder='Search'/>
                <img src={searchIcon} alt=""  onClick={()=>search(inputRef.current.value)}/>
            </div>
            {/* apide sıkıntı çıktığında veri gelmezse tüm uiı dispose etmek için */}
            {weatherData?<>
                <img src={weatherData.icon} alt="" className='weather-icon' />
            <p className='temp'>{weatherData.temperature}°C</p>
            <p className='location'>{weatherData.location}</p>
            <div className="weather-data">
                <div className='col'>
                        <img src={humidity} alt="" />
                        <div>
                            <p>{weatherData.humidity}%</p>
                            <span>Humidity</span>
                        </div>
                </div>
                <div className='col'>
                        <img src={wind} alt="" />
                        <div>
                            <p>{weatherData.wind} Km/h</p>
                            <span>Wind speed</span>
                        </div>
                </div>
            </div>
            </>:<></>}
            
        </div>
    </>
  )
}

export default Weather
