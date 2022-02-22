import { useState } from 'react';
import './App.css';

function App() {

  const [city, setCity] = useState("")
  const key = 'bb8b7a1351ef4ccb95b13932222202'

  const linkAPI = `https://api.weatherapi.com/v1/current.json?key=${key}&q=${city}&aqi=no`

  const weatherCity = (event) => {
    event.preventDefault()
    fetch(linkAPI)
      .then(res => res.json())
      .then(response => {
        console.log(response);
      })
      .catch((e) => {
        console.log(e);
      })
  }


  return (
    <div className="App">
      <section>
        <form>
          <input
            placeholder='city name'
            type='text'
            value={city}
            onChange={(e) => setCity(e.target.value)}
          ></input>
          <button onClick={weatherCity}>Check</button>
        </form>
      </section>
    </div>
  );
}

export default App;
