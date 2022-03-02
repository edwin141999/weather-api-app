import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function Current() {

    const { state } = useLocation()
    let [location, setLocation] = useState([])
    const [current, setCurrent] = useState([])
    const [condition, setCondition] = useState([])
    const [errorMessage, setErrorMessage] = useState("")
    const [loading, setLoading] = useState(false)//Para el tiempo de carga

    let message = null

    const weatherCity = (city) => {
        const key = 'bb8b7a1351ef4ccb95b13932222202'
        const linkAPI = `http://api.weatherapi.com/v1/forecast.json?key=${key}&q=${city}&days=7`
        setLoading(true)
        if (city !== "") {
            setTimeout(() => {
                fetch(linkAPI)
                    .then(res => res.json())
                    .then(response => {
                        console.log(response);
                        if (response.error) {
                            setErrorMessage(response.error.message)
                        } else {
                            setErrorMessage("")
                            setLocation(response.location)
                            setCurrent(response.current)
                            setCondition(response.current.condition)
                        }
                        setLoading(false)
                    })
                    .catch((e) => {
                        console.log(e);
                    })
            }, 2000)
        }
    }

    useEffect(() => {
        if (state) {
            const { nameCity } = state
            weatherCity(nameCity)
        }
    }, [state])

    const styles = {
        bold: `text-gray-700 text-base font-bold`,
        semibold: `font-semibold`
    }

    if (location.length === 0) {
        if (errorMessage === 'No matching location found.') {
            message = <div className='p-5 bg-red-600 rounded'>
                <p className='font-semibold text-white'>{errorMessage}</p>
            </div>
        } else {
            message = <div className='p-5 bg-blue-500 rounded'>
                <p className='font-semibold text-white'>Waiting for a city</p>
            </div>
        }
    }
    else {
        if (errorMessage === 'No matching location found.') {
            message =
                <div className='p-5 bg-red-600'>
                    <p className='font-semibold text-white'>{errorMessage}</p>
                </div>
        } else {
            console.log('size:', location.length);
            message = <>
                <p className='text-2xl font-bold text-gray-700'>Clima en {location.name}</p>
                <span className='text-2xl font-semibold text-gray-700'>{current.temp_c}°C</span>
                <div className='flex items-center justify-start'>
                    <img src={condition.icon} alt='No hay imagen' className='px-5'></img>
                    <span className='font-semibold text-gray-700'>{condition.text}</span>
                </div>
                <p className={styles.bold}>Humedad: <span className={styles.semibold}>{current.humidity}%</span></p>
                <p className={styles.bold}>Viento: <span className={styles.semibold}>{current.wind_kph} km/h</span></p>
            </>
        }
    }


    return (
        <div className='px-5'>
            <div className='flex justify-center'>
                <div className='px-8 pt-6 pb-5 m-auto bg-white rounded-md shadow-md'>
                    {
                        loading
                            ?
                            <div className='p-5 bg-green-600 rounded-md'><p className='font-semibold text-white'>Cargando...</p></div>
                            :
                            message
                    }
                </div>
            </div>
        </div>
    );
}

export default Current;