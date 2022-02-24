import { useState } from 'react';

function Current() {
    const [city, setCity] = useState("")
    let [location, setLocation] = useState([])
    const [current, setCurrent] = useState([])
    const [condition, setCondition] = useState([])
    const [message, setMessage] = useState("")

    let loading = null

    const key = 'bb8b7a1351ef4ccb95b13932222202'
    const linkAPI = `https://api.weatherapi.com/v1/current.json?key=${key}&q=${city}&aqi=no`
    //const prueba = `http://api.weatherapi.com/v1/forecast.json?key=bb8b7a1351ef4ccb95b13932222202&q=07112&days=7`

    //TODO: Navbar con 2 cosas: la primera muestra la info del dia actual y la segunda muestra la info del dia actual mas 2 dias más abarcando mas datos

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
                <div className='font-bold text-xl mb-2'>Temperatura actual: <span className={styles.semibold}>{current.temp_c}</span></div>
                <img src={condition.icon} alt='No hay imagen' className='w-52 mx-auto'></img>
                <p className={styles.bold}>Fecha y hora: <span className={styles.semibold}>{location.localtime}</span></p>
                <p className={styles.bold}>Condicion: <span className={styles.semibold}>{condition.text}</span></p>
                <p className={styles.bold}>Ciudad: <span className={styles.semibold}>{location.name}</span></p>
                <p className={styles.bold}>Estado: <span className={styles.semibold}>{location.region}</span></p>
                <p className={styles.bold}>Pais: <span className={styles.semibold}>{location.country}</span></p>
                <p className={styles.bold}>Humedad: <span className={styles.semibold}>{current.humidity}</span></p>
            </>
        }
    }


    return (
        <div className='py-5'>
            <div className='flex justify-center'>
                <div className='bg-white shadow-md rounded px-8 pt-5 pb-8 mb-4 m-auto'>
                    <label className='block text-gray-700 text-sm font-bold'>Ciudad</label>
                    <form className='flex items-center border-b border-teal-500 py-2'>
                        <input
                            placeholder='Introduce la ciudad'
                            type='text'
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className='appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1  leading-tight focus:outline-none font-semibold'
                        ></input>
                        <div className=''>
                            <button className='flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded font-bold' onClick={weatherCity}>Buscar</button>
                        </div>
                    </form>
                </div>
            </div>
            <div className='flex justify-center'>
                <div className='bg-white shadow-md rounded px-8 pt-6 pb-5 m-auto'>
                    {loading}
                </div>
            </div>
        </div>
    );
}

export default Current;