import { useState } from 'react';
import { BsSearch } from 'react-icons/bs';

function Current() {
    const [city, setCity] = useState("")
    let [location, setLocation] = useState([])
    const [current, setCurrent] = useState([])
    const [condition, setCondition] = useState([])
    const [message, setMessage] = useState("")

    let loading = null

    const key = 'bb8b7a1351ef4ccb95b13932222202'
    const linkAPI = `http://api.weatherapi.com/v1/forecast.json?key=${key}&q=${city}&days=7`

    const weatherCity = (event) => {
        event.preventDefault()
        if (city !== "") {
            fetch(linkAPI)
                .then(res => res.json())
                .then(response => {
                    console.log(response);
                    if (response.error) {
                        setMessage(response.error.message)
                    } else {
                        setMessage("")
                        setLocation(response.location)
                        setCurrent(response.current)
                        setCondition(response.current.condition)
                    }
                })
                .catch((e) => {
                    console.log(e);
                })
        }
    }

    const styles = {
        bold: `text-gray-700 text-base font-bold`,
        semibold: `font-semibold`
    }

    if (location.length === 0) {
        if (message === 'No matching location found.') {
            loading = <div className='bg-red-600 p-5 rounded'>
                <p className='text-white font-semibold'>{message}</p>
            </div>
        } else {
            loading = <div className='bg-blue-500 p-5 rounded'>
                <p className='text-white font-semibold'>Welcome to Weather Page</p>
            </div>
        }
    }
    else {
        if (message === 'No matching location found.') {
            loading = <div className='bg-red-600 p-5'>
                <p className='text-white font-semibold'>{message}</p>
            </div>
        } else {
            loading = <>
                <p className='text-gray-700 font-bold text-2xl'>Clima en {location.name}</p>
                <span className='font-semibold text-2xl text-gray-700'>{current.temp_c}°C</span>
                <div className='flex justify-start items-center'>
                    <img src={condition.icon} alt='No hay imagen' className='px-5'></img>
                    <span className='text-gray-700 font-semibold'>{condition.text}</span>
                </div>
                <p className={styles.bold}>Humedad: <span className={styles.semibold}>{current.humidity}%</span></p>
                <p className={styles.bold}>Viento: <span className={styles.semibold}>{current.wind_kph} km/h</span></p>
            </>
        }
    }


    return (
        <div className='py-5 px-5'>
            <div className='flex justify-center'>
                <div className='bg-white shadow-md rounded-md px-8 pt-5 pb-8 mb-4 m-auto'>
                    <form className='flex items-center border-b border-teal-500 py-2'>
                        <input
                            placeholder='Buscar ciudad'
                            type='text'
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className='appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1  leading-tight focus:outline-none font-semibold'
                        ></input>
                        <div>
                            <button className='flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded-full font-bold' onClick={weatherCity}><BsSearch /></button>
                        </div>
                    </form>
                </div>
            </div>
            <div className='flex justify-center'>
                <div className='bg-white shadow-md rounded-md px-8 pt-6 pb-5 m-auto'>
                    {loading}
                </div>
            </div>
        </div>
    );
}

export default Current;