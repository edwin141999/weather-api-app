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

    const weatherCity = (event) => {
        event.preventDefault()
        if (city !== "") {
            fetch(linkAPI)
                .then(res => res.json())
                .then(response => {
                    console.log('response:', response);
                    if (response.error) {
                        setMessage(response.error.message)
                    } else {
                        console.log('mensajeantes:', message);
                        setMessage("")
                        setLocation(response.location)
                        setCurrent(response.current)
                        setCondition(response.current.condition)
                        console.log('mensajedespues:', message);
                    }
                })
                .catch((e) => {
                    console.log(e);
                })
        }
    }

    if (location.length === 0) {
        if (message === 'No matching location found.') {
            loading = <>
                <p>{message}</p>
            </>
        } else {
            loading = <>
                <p>Esperando</p>
            </>
        }
    }
    else {
        if (message === 'No matching location found.') {
            loading = <><p>{message}</p></>
        } else {
            loading = <>
                <p>Temperatura actual: {current.temp_c}</p>
                <img src={condition.icon} alt='No hay imagen'></img>
                <p>Fecha y hora: {location.localtime}</p>
                <p>Condicion: {condition.text}</p>
                <p>Ciudad: {location.name}</p>
                <p>Estado: {location.region}</p>
                <p>Pais: {location.country}</p>
                <p>Humedad: {current.humidity}</p>
            </>
        }
    }


    return (
        <div>
            <form>
                <input
                    placeholder='city name'
                    type='text'
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                ></input>
                <button onClick={weatherCity}>Check</button>
            </form>
            <section>
                {loading}
            </section>
        </div>

    );
}

export default Current;