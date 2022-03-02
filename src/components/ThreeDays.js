import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function ThreeDays() {

    const { state } = useLocation()
    const [loading, setLoading] = useState(false)
    let [location, setLocation] = useState([])
    const [current, setCurrent] = useState([])
    const [condition, setCondition] = useState([])
    const [errorMessage, setErrorMessage] = useState("")
    const [days, setDays] = useState([])


    const weatherCityDays = (city) => {
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
                            setDays(response.forecast.forecastday)
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
            console.log('ciudad:', nameCity);
            weatherCityDays(nameCity)
        }
    }, [state])

    const styles = {
        bold: `text-gray-700 text-base font-bold`,
        semibold: `font-semibold`
    }

    return (
        <div className="px-5 md:flex md:justify-center">
            <div className="lg:flex lg:justify-center ">
                {days.map((data) => {
                    return <div className="px-8 pt-6 pb-5 m-5 mb-5 bg-white rounded-md shadow-md" key={data.date}>
                        {loading ?
                            <div className='p-5 bg-green-600 rounded-md'><p className='font-semibold text-white'>Cargando...</p></div>
                            :
                            <div>
                                <p className="text-xl font-bold text-gray-700">Fecha: <span className={styles.semibold}>{data.date}</span></p>
                                <span className="text-2xl font-semibold text-gray-700">Min: {data.day.mintemp_c} - Max: {data.day.maxtemp_c}</span>
                                <div className="flex items-center justify-start">
                                    <img src={data.day.condition.icon} alt="No hay imagen" className="px-5" />
                                    <span className="font-semibold text-gray-700">{data.day.condition.text}</span>
                                </div>
                                <p className={styles.bold}>Humedad promedio: <span className={styles.semibold}>{data.day.avghumidity}</span></p>
                                <p className={styles.bold}>Viento promedio: <span className={styles.semibold}>{data.day.maxwind_kph}</span></p>
                            </div>
                        }
                    </div>
                })}
            </div>
        </div>
    );
}

export default ThreeDays;