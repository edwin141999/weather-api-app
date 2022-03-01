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
            message = <div className='bg-red-600 p-5 rounded'>
                <p className='text-white font-semibold'>{errorMessage}</p>
            </div>
        } else {
            message = <div className='bg-blue-500 p-5 rounded'>
                <p className='text-white font-semibold'>Waiting for a city</p>
            </div>
        }
    }
    else {
        if (errorMessage === 'No matching location found.') {
            message =
                <div className='bg-red-600 p-5'>
                    <p className='text-white font-semibold'>{errorMessage}</p>
                </div>
        } else {
            console.log('size:', location.length);
            message = <>
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
        <div className='px-5'>
            <div className='flex justify-center'>
                <div className='bg-white shadow-md rounded-md px-8 pt-6 pb-5 m-auto'>
                    {
                        loading
                            ?
                            <div className='bg-green-600 p-5 rounded-md'><p className='text-white font-semibold'>Cargando...</p></div>
                            :
                            message
                    }
                </div>
            </div>
        </div>
    );
}

export default Current;