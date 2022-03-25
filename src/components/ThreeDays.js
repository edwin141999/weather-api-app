import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ErrorPage from "./ErrorPage";
import LoadingPage from "./LoadingPage";

function ThreeDays() {

    const { state } = useLocation()
    const [loading, setLoading] = useState(false)
    let [location, setLocation] = useState([])
    const [errorMessage, setErrorMessage] = useState("")
    const [days, setDays] = useState([])
    const [bandera, setBandera] = useState(false)

    let message = null

    const weatherCityDays = (city) => {
        const key = 'bb8b7a1351ef4ccb95b13932222202'
        const linkAPI = `https://api.weatherapi.com/v1/forecast.json?key=${key}&q=${city}&days=7&lang=es`
        setLoading(true)
        setTimeout(() => {
            fetch(linkAPI)
                .then(res => res.json())
                .then(response => {
                    if (response.error) {
                        setErrorMessage(response.error.message)
                    } else {
                        setBandera(false)
                        setErrorMessage("")
                        setLocation(response.location)
                        setDays(response.forecast.forecastday)
                    }
                    setLoading(false)
                })
                .catch((e) => {
                    console.log(e);
                })
        }, 2000)
    }

    useEffect(() => {
        setBandera(true)
        if (state) {
            const { nameCity } = state
            weatherCityDays(nameCity)
        }
    }, [state])

    const styles = {
        bold: `text-gray-700 text-xs sm:text-xs md:text-base lg:text-base font-bold`,
        semibold: `font-semibold`,
        transparent: `bg-transparent shadow-none`,
        white: `bg-white`
    }

    if (location.length === 0) {
        if (errorMessage === 'No matching location found.') {
            message = <ErrorPage errorMessage={errorMessage} />
        } else {
            message = <div className='p-5 bg-blue-500 rounded'>
                <p className='font-semibold text-white'>Waiting for a city</p>
            </div>
        }
    }
    else {
        if (errorMessage === 'No matching location found.') {
            message = <ErrorPage errorMessage={errorMessage} />
        } else {
            message =
                <>
                    <div className="absolute bg-white m-1 rounded-md shadow-md inset-x-3.5 md:inset-x-1/4 lg:inset-x-1/3 top-48 ">
                        <p className='text-base sm:text-xs md:text-2xl lg:text-2xl font-bold text-gray-700 text-center m-1'>Clima en {location.name}</p>
                    </div>
                    {days.map((data) => {
                        return <div className="px-8 pt-6 pb-5 m-5 mb-5 bg-white rounded-md shadow-md" key={data.date}>
                            <p className="text-base sm:text-xs md:text-xl lg:text-xl font-bold text-gray-700">Fecha: <span className={styles.semibold}>{data.date}</span></p>
                            <span className="text-base sm:text-xs md:text-xl lg:text-xl font-semibold text-gray-700">Min: {data.day.mintemp_c}°C - Max: {data.day.maxtemp_c}°C</span>
                            <div className="text-center">
                                <img src={data.day.condition.icon} alt="No hay imagen" className="px-5 mx-auto" />
                                <span className="font-semibold text-gray-700 text-xs sm:text-xs md:text-base lg:text-base">{data.day.condition.text}</span>
                            </div>
                            <p className={styles.bold}>Humedad promedio: <span className={styles.semibold}>{data.day.avghumidity}</span></p>
                            <p className={styles.bold}>Viento promedio: <span className={styles.semibold}>{data.day.maxwind_kph}</span></p>
                        </div>
                    })}
                </>
        }
    }

    return (
        <div className="px-5">
            <div className="flex justify-center">
                <div className={`lg:flex px-8 pt-6 pb-5 m-auto rounded-md shadow-md ${bandera ? styles.white : styles.transparent}`}>
                    {
                        loading
                            ? <LoadingPage />
                            : message
                    }
                </div>
            </div>
        </div>
    );
}

export default ThreeDays;