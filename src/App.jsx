import React, { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [lat, setLat] = useState('');
  const [long, setLong] = useState('');
  const [isLoading, setIsloading] = useState(false);
  const [active, setActive] = useState(false);


  function getCords() {
    setIsloading(true);
    navigator.geolocation.getCurrentPosition((pos) => {
      setLat(pos.coords.latitude);
      setLong(pos.coords.longitude);
      setIsloading(false);
    })
  };

  function reset() {
    setLat('');
    setLong('');
  }

  async function copyCords() {
    setActive(true);
    await navigator.clipboard.writeText(`Latitude: ${lat}, Longitude: ${long}`);
    setTimeout(() => {
      setActive(false);
    }, 3000)
  }

  return (
    <div className="container">
      <header>
        <h1 className="">Cords Grabber</h1>
        <p>Your one stop for getting your current Cordinates</p>
      </header>
      <div className="divider"></div>
      <main>

        {
          isLoading
            ?
            <div>
              <div className="divider"></div>
              <p className='loading'>Loading <br />Please Wait for results</p>
            </div>
            :
            <div className='cords-container'>
              {
                lat && long
                  ?
                  <div className='cords-container'>
                    <p className='cord-text'>Latitude: <span>{lat}</span></p>
                    <p className='cord-text'>Longitude: <span>{long}</span></p>
                    <div className="divider-2"></div>
                    <button onClick={copyCords}>Copy Cords</button>
                    <button onClick={reset}>Reset</button>
                  </div>
                  : <button onClick={getCords} type='button'>Click to get Cords</button>
              }
            </div>
        }
      </main>
        {
          active
            ?
            <div className='copy-message'>
              Cords Copied
            </div>
            : <></>
        }
    </div>
  )
}

export default App
