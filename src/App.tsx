import axios from 'axios'
import React, { useEffect } from 'react'
import { Button, Col, Container, Offcanvas, Row, Spinner, Table } from 'react-bootstrap'

import './App.css'

function App() {
  // const [dataz, setDataz] = React.useState<any>({})
  // const [datax, setDatax] = React.useState<any>({})
  const [dailys, setDaily] = React.useState<any>({})
  const [lati, setLati] = React.useState<any>('')
  const [longi, setLongi] = React.useState<any>('')
  const [tempe, setTemp] = React.useState<any>({})
  const week = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon']

  const [show, setShow] = React.useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  // const imgSrc = dailys.current.weather[0].icon
  const [iconWeather, setIcon] = React.useState([
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
  ])
  const [iconMiniWeather, setIconMini] = React.useState([
    {
      id: '0esw',
      src: 'https://img.icons8.com/external-line-adri-ansyah/25/ffffff/external-weather-weather-line-adri-ansyah.png',
      description: 'ensoleilé',
      status: 'jour',
    },
    {
      id: '1rdx',
      src: 'https://img.icons8.com/external-solid-adri-ansyah/25/ffffff/external-weather-weather-solid-adri-ansyah-19.png',
      description: 'couvert',
      status: 'jour',
    },
    {
      id: '2tfc',
      src: 'https://img.icons8.com/external-solid-adri-ansyah/25/ffffff/external-weather-weather-solid-adri-ansyah-16.png',
      description: 'peu nuageux',
      status: 'jour',
    },
    {
      id: '3ygv',
      src: 'https://img.icons8.com/external-line-adri-ansyah/25/ffffff/external-weather-weather-line-adri-ansyah-9.png',
      description: 'partiellement nuageux',
      status: 'jour',
    },
    {
      id: '4uhb',
      src: 'https://img.icons8.com/external-line-adri-ansyah/25/ffffff/external-weather-weather-line-adri-ansyah-12.png',
      description: 'pluie',
      status: 'jour',
    },
    {
      id: '5ijn',
      src: 'https://img.icons8.com/external-line-adri-ansyah/25/ffffff/external-weather-weather-line-adri-ansyah-18.png',
      description: 'légère pluie',
      status: 'jour',
    },
    {
      id: '6okn',
      src: 'https://img.icons8.com/external-line-adri-ansyah/25/ffffff/external-weather-weather-line-adri-ansyah-18.png',
      description: 'pluie modérée',
      status: 'jour',
    },
  ])

  const nowDate = Date().slice(4, 15)
  useEffect(() => {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    }

    function success(pos: any) {
      const crd = pos.coords

      setLati(crd.latitude)
      setLongi(crd.longitude)
    }

    function error(err: any) {
      console.warn(`ERREUR (${err.code}): ${err.message}`)
    }

    navigator.geolocation.getCurrentPosition(success, error, options)

    var requestOptions = {
      method: 'GET',
    }

    fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lati}&lon=${longi}&exclude=hourly,minutely&lang=fr&units=metric&APPID=04f2e2726f2ee1b6a902947126162cc5`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(nowDate.slice(0, 3))
        console.log(dailys)
        setDaily(result)
      })
      .catch((error) => console.log('error', error))
  }, [])
  return (
    <div className='App'>
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
            {nowDate}
          </Col>
          <Col className='col-2 text-end'>
            <img
              src='https://img.icons8.com/external-prettycons-lineal-prettycons/30/ffffff/external-info-technology-prettycons-lineal-prettycons.png'
              alt='info'
            />
          </Col>
          <>
            <Offcanvas className='bg-secondary w-75' show={show} onHide={handleClose}>
              <Offcanvas.Header closeButton>
                <Offcanvas.Title>Ressources</Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                En developpement <Spinner animation={'border'} />
              </Offcanvas.Body>
            </Offcanvas>
          </>
        </Row>
      </Container>
      <Container className='mt-2'>
        {iconWeather
          .filter((ico) => ico.description == dailys.current.weather[0].description)
          .map((filtered) => (
            <img src={filtered.src} alt={filtered.description} />
          ))}
        <img
          src={`http://openweathermap.org/img/wn/${dailys.current.weather[0].icon}@4x.png`}
          alt={dailys.current.weather[0].description}
        />
        <p>{dailys.current.weather[0].description} </p>
        <h1>{dailys.current.temp.toFixed(0)} °C </h1>
        <p className='day_after'>
          Température ressentie {dailys.current.feels_like.toFixed(0)}°
        </p>
      </Container>
      <Container className='day_after mt-4 px-2'>
        <Row>
          <Col>
            <img src='https://img.icons8.com/glyph-neue/25/ffffff/wind.png' alt='wind' />{' '}
            {(dailys.current.wind_speed * 1.852).toFixed(2)} Km/h
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
        <p>Next 5 days</p>
        <hr />
        <Row>
          {week.slice(4).map((jour: any, index: string | number) => (
            <Col className='px-3' key={jour}>
              <h2 className='day_after'>{jour}</h2>

              {iconMiniWeather
                .filter(
                  (ico) => ico.description === dailys.daily[index].weather[0].description
                )
                .map((filtered) => (
                  <span className='mini'>
                    <img src={filtered.src} alt={filtered.description} />
                    <img
                      src={`http://openweathermap.org/img/wn/${dailys.daily[index].weather[0].icon}.png`}
                      alt={dailys.daily[index].weather[0].description}
                    />
                  </span>
                ))}

              <p className='day_after'>{dailys.daily[index].temp.day.toFixed(0)}°</p>
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
        <br />
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
            <img src='https://img.icons8.com/ios/50/ffffff/sunrise--v1.png' alt='sunrise' />
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
            <img src='https://img.icons8.com/ios/50/ffffff/sunset--v1.png' alt='sunset' />
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default App
