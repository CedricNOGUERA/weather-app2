import axios from 'axios'
import React, { useEffect } from 'react'
import { Button, Col, Container, Offcanvas, Row, Spinner, Table } from 'react-bootstrap'

import './App.css'

function App() {
  const [dailys, setDaily] = React.useState<any>([])
  const [degree, setDegree] = React.useState<any>()
  const week = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

  const [show, setShow] = React.useState(false)
  const nowDay = Date().slice(0, 3)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const iconWeather = [
    {
      id: '0esw',
      src: 'https://img.icons8.com/external-line-adri-ansyah/128/ffffff/external-weather-weather-line-adri-ansyah.png',
      description: 'ensoleilé',
      status: 'jour',
    },
    {
      id: '1rdx',
      src: 'https://img.icons8.com/external-solid-adri-ansyah/128/ffffff/external-weather-weather-solid-adri-ansyah-19.png',
      description: 'couvert',
      status: 'jour',
    },
    {
      id: '2tfc',
      src: 'https://img.icons8.com/external-solid-adri-ansyah/128/ffffff/external-weather-weather-solid-adri-ansyah-16.png',
      description: 'peu nuageux',
      status: 'jour',
    },
    {
      id: '3ygv',
      src: 'https://img.icons8.com/external-line-adri-ansyah/128/ffffff/external-weather-weather-line-adri-ansyah-9.png',
      description: 'partiellement nuageux',
      status: 'jour',
    },
    {
      id: '4uhb',
      src: 'https://img.icons8.com/external-line-adri-ansyah/128/ffffff/external-weather-weather-line-adri-ansyah-12.png',
      description: 'pluie',
      status: 'jour',
    },
    {
      id: '5ijn',
      src: 'https://img.icons8.com/external-line-adri-ansyah/128/ffffff/external-weather-weather-line-adri-ansyah-18.png',
      description: 'légère pluie',
      status: 'jour',
    },
    {
      id: '6okn',
      src: 'https://img.icons8.com/external-line-adri-ansyah/128/ffffff/external-weather-weather-line-adri-ansyah-18.png',
      description: 'pluie modérée',
      status: 'jour',
    },
  ]
  const iconMiniWeather = [
    {
      id: '0es',
      src: 'https://img.icons8.com/external-line-adri-ansyah/25/ffffff/external-weather-weather-line-adri-ansyah.png',
      description: 'ensoleilé',
      status: 'jour',
    },
    {
      id: '1rd',
      src: 'https://img.icons8.com/external-solid-adri-ansyah/25/ffffff/external-weather-weather-solid-adri-ansyah-19.png',
      description: 'couvert',
      status: 'jour',
    },
    {
      id: '2tf',
      src: 'https://img.icons8.com/external-solid-adri-ansyah/25/ffffff/external-weather-weather-solid-adri-ansyah-16.png',
      description: 'peu nuageux',
      status: 'jour',
    },
    {
      id: '3yg',
      src: 'https://img.icons8.com/external-line-adri-ansyah/25/ffffff/external-weather-weather-line-adri-ansyah-9.png',
      description: 'partiellement nuageux',
      status: 'jour',
    },
    {
      id: '4uh',
      src: 'https://img.icons8.com/external-line-adri-ansyah/25/ffffff/external-weather-weather-line-adri-ansyah-12.png',
      description: 'pluie',
      status: 'jour',
    },
    {
      id: '5ij',
      src: 'https://img.icons8.com/external-line-adri-ansyah/25/ffffff/external-weather-weather-line-adri-ansyah-18.png',
      description: 'légère pluie',
      status: 'jour',
    },
    {
      id: '6ok',
      src: 'https://img.icons8.com/external-line-adri-ansyah/25/ffffff/external-weather-weather-line-adri-ansyah-18.png',
      description: 'pluie modérée',
      status: 'jour',
    },
  ]
  const degWind = [
    {
     "deg": "N",
     "name": "Nord",
     "id": 1
    },
    {
     "deg": "NNE",
     "name": "Nord N.Est",
     "id": 2
    },
    {
     "deg": "NE",
     "name": "Nord Est",
     "id": 3
    },
    {
     "deg": "ENE",
     "name": "Est N.Est",
     id: 4
    },
    {
     "deg": "E",
     "name": "Sud",
     "id": 5
    },
    {
     "deg": "ESE",
     "name": "Est S.Est",
     "id": 6
    },
    {
     "deg": "SE",
     "name": "Sud Est",
     "id": 7
    },
    {
     "deg": "SSE",
     "name": "Sud S.Est",
     "id": 8
    },
    {
     "deg": "S",
     "name": "Sud",
     "id": 9
    },
    {
     "deg": "SSW",
    
     "name": "Sud S.Ouest",
     id: 10
    },
    {
     "deg": "SW",
     "name": "Sud Ouest",
     "id": 11
    },
    {
     "deg": "WSW",
     "name": "Ouest S.Ouest",
     "id": 12
    },
    {
     "deg": "W",
     "name": "Ouest",
     "id": 13
    },
    {
     "deg": "WNW",
     "name": "Ouest N.Ouest",
     "id": 14
    },
    {
     "deg": "NW",
     "name": "Nord Ouest",
     "id": 15
    },
    {
     "deg": "NNW",
     "name": "Nord N.Ouest",
     "id": 16
    }
   ]

      useEffect(() => {
        const options = {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
        
  function success(pos: any) {
    const crd = pos.coords

    var lang=navigator.language.slice(0,2);
    

   
    var lati = crd.latitude
    var longi = crd.longitude
    const fetchData = async () => {
      const result = await axios(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lati}&lon=${longi}&exclude=hourly,minutely&APPID=04f2e2726f2ee1b6a902947126162cc5&lang=${lang}&units=metric`
  
         )
         const deg_wind: any = parseInt(((result.data.current.wind_deg % 360)/22.5).toFixed(0))+1
        setDaily(result.data)
        setDegree (deg_wind)
    }
    fetchData()
  }

  function error(err: any) {
    console.warn(`ERREUR (${err.code}): ${err.message}`)
  }

  navigator.geolocation.getCurrentPosition(success, error, options)

  }, [])
  
 



  return (
    <div className='App'>

      {dailys.cod}
      { dailys.lat ? (
        <>
      <Container className='pt-2'>
        <Row>
          <Col className='col-2'>
            <Button className='p-0' variant='' onClick={handleShow}>
              <img
                src='https://img.icons8.com/ios-filled/30/ffffff/menu-rounded.png'
                alt='menu'
                />
            </Button>
          </Col>
          <Col>
            <h2>{dailys.timezone}</h2>
          </Col>
          <Col className='col-2 text-center'>
            <img
              src='https://img.icons8.com/external-prettycons-lineal-prettycons/30/ffffff/external-info-technology-prettycons-lineal-prettycons.png'
              alt='info'
              />
          </Col>
          <>
            <Offcanvas className='bg-secondary w-75' show={show} onHide={handleClose}>
              <Offcanvas.Header closeButton>
                <Offcanvas.Title>Prévisions : </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <div>
                  <img src='https://img.icons8.com/external-others-amoghdesign/24/000000/external-arrow-multimedia-solid-24px-others-amoghdesign-2.png' />
                  Demain
                </div>
                <div>10 jours</div>
              </Offcanvas.Body>
            </Offcanvas>
          </>
        </Row>
      </Container>
      <Container className='mt-2'>
        {iconWeather
          .filter((ico) => ico.description == dailys.current.weather[0].description)
          .map((filtered) => (
            <img src={filtered.src} alt={filtered.description} key={filtered.id} />
            ))}

        <p>{dailys.current.weather[0].description} </p>
        <h1>{dailys.current.temp.toFixed(0)} °C </h1>
        <p className='day_after'>
          Feel like {dailys.current.feels_like.toFixed(0)}°
        </p>
      </Container>
      <Container className='day_after mt-4 px-2'>
        <Row>
          <Col>
         
            <img src='https://img.icons8.com/glyph-neue/25/ffffff/wind.png' alt='wind' />{' '}
            {(dailys.current.wind_speed * 3.6).toFixed(0)} Km/h <br />
            <img src='./src/assets/icons8-compass-north-24.png' alt='orientation' />{' '}
            {degWind
              .filter((windDeg) => windDeg.id == degree)
              .map((filteredDeg) => (
                <span key={filteredDeg.id}>{filteredDeg.name}</span>
                ))}
               
          </Col>
          <Col className='col-4'>
            <img
              src='https://img.icons8.com/external-nawicon-glyph-nawicon/25/ffffff/external-drop-ecology-nawicon-glyph-nawicon.png'
              alt='himidity'
              />
            {dailys.current.humidity} %
          </Col>
          <Col>
            <img src='https://img.icons8.com/glyph-neue/25/ffffff/atmospheric-pressure.png' />{' '}
            {dailys.current.pressure} hpa
          </Col>
        </Row>
      </Container>
      <Container className='mt-3 mt-lg-5'>
        <p>Next 6 days</p>
        <hr />
        <Row>
          {week
            .filter((days) => nowDay !== days)
            .map((jour: any, index: any) => (
              <Col className='px-3' key={jour}>
                <h2 className='day_after'>{jour}</h2>

                {iconMiniWeather
                  .filter(
                    (ico) => ico.description === dailys.daily[index].weather[0].description
                  )
                  .map((filtered) => (
                    <span className='mini' key={filtered.id.toString()} >
                      <img src={filtered.src} alt={filtered.description} />
                    </span>
                  ))}

                <p className='day_after'>{Math.round(dailys.daily[index].temp.day)}°</p>
              </Col>
            ))}
        </Row>
      </Container>
      <Container className='mt-2 mt-lg-5'>
        <p className='day_after'>
          LAST UPDATE{' '}
          {new Intl.DateTimeFormat('fr-FR', {
            day: '2-digit',
            month: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          }).format(dailys.current.dt * 1000)}
        </p>
        <Row className='mt-lg-5 pb-2 pb-lg-5'>
          <Col>
            <p className='day_after'>
              {new Intl.DateTimeFormat('fr-FR', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
              }).format(dailys.current.sunrise * 1000)}
              {', '}
              sunrise
            </p>
            <img src='https://img.icons8.com/ios/40/ffffff/sunrise--v1.png' alt='sunrise' />
          </Col>
          <Col>
            <p className='day_after'>
              {new Intl.DateTimeFormat('fr-FR', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
              }).format(dailys.current.sunset * 1000)}
              {', '}sunset
            </p>
            <img src='https://img.icons8.com/ios/40/ffffff/sunset--v1.png' alt='sunset' />
          </Col>
        </Row>
      </Container>
      </>
      ) : null }
    </div>
  )
}

export default App
