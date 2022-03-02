import axios from 'axios'
import React, { useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'

import './App.css'

function App() {
  const [dataz, setDataz] = React.useState<any>({})
  const [datax, setDatax] = React.useState<any>({})
  const [dailys, setDaily] = React.useState<any>({})
  const [lati, setLati] = React.useState<any>('')
  const [longi, setLongi] = React.useState<any>('')
  const [tempe, setTemp] = React.useState<any>({})
  const week = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

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

    var myHeaders = new Headers()
    myHeaders.append('x-rapidapi-host', 'community-open-weather-map.p.rapidapi.com')
    myHeaders.append('x-rapidapi-key', '32308659a3mshac5e15833b24bd4p18161cjsnd7e136918519')

    var requestOption = {
      method: 'GET',
      headers: myHeaders,
    }

    fetch(
      `https://community-open-weather-map.p.rapidapi.com/climate/month?q=French Polynesia, PF&lang=fr&units=metric&lat=${lati}&lon=${longi}&cnt=5`,
      requestOption
    )
      .then((response) => response.json())
      .then((result) => {
        setDatax(result)
      })
      .catch((error) => console.warn('error', error))

    var requestOptions = {
      method: 'GET',
    }

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=French Polynesia, PF &APPID=04f2e2726f2ee1b6a902947126162cc5&units=metric&lang=fr&lat=${lati}&lon=${longi}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setDataz(result)
      })
      .catch((error) => console.log('error', error))

    var requestOptions = {
      method: 'GET',
    }

    fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lati}&lon=${longi}&exclude=hourly,minutely&lang=fr&units=metric&APPID=04f2e2726f2ee1b6a902947126162cc5`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setDaily(result)
        console.log(dailys)
        console.log(dailys.daily[0].temp.day)
      })
      .catch((error) => console.log('error', error))
  }, [])

  return (
    <div className='App'>
      <Container className='pt-2'>
        <Row>
          <Col className='col-2'>
            <img
              src='https://img.icons8.com/ios-filled/30/ffffff/menu-rounded.png'
              alt='menu'
            />
          </Col>
          <Col>
            <h2>{dataz.name}</h2>
          </Col>
          <Col className='col-2 text-end'>
            <img
              src='https://img.icons8.com/external-prettycons-lineal-prettycons/30/ffffff/external-info-technology-prettycons-lineal-prettycons.png'
              alt='info'
            />
          </Col>
        </Row>
      </Container>
      <Container className='mt-4'>
        {dailys.current.weather[0].description == 'Clear' ? (
          <img
            src='https://img.icons8.com/external-line-adri-ansyah/128/ffffff/external-weather-weather-line-adri-ansyah.png'
            alt='ensoleillé'
          />
        ) : dailys.current.weather[0].description == 'peu nuageux' ? (
          <>
            <img
              src='https://img.icons8.com/external-solid-adri-ansyah/118/ffffff/external-weather-weather-solid-adri-ansyah-16.png'
              alt='partiellement-nuageux'
            />
          </>
        ) : dailys.current.weather[0].description == 'overcast clouds' ? (
          <>
            <img src='https://img.icons8.com/external-line-adri-ansyah/128/ffffff/external-weather-weather-line-adri-ansyah-15.png' />
          </>
        ) : dailys.current.weather[0].description == 'light rain' ? (
          <img
            src='https://img.icons8.com/external-line-adri-ansyah/128/ffffff/external-weather-weather-line-adri-ansyah-12.png'
            alt='pluvieux'
          />
        ) : (
          <img
            src='https://img.icons8.com/external-solid-adri-ansyah/128/ffffff/external-weather-weather-solid-adri-ansyah-5.png'
            alt='pluvieux'
          />
        )}

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
            {(dataz.wind.speed * 1.852).toFixed(2)} Km/h
          </Col>
          <Col className='col-4'>
            <img
              src='https://img.icons8.com/external-nawicon-glyph-nawicon/25/ffffff/external-drop-ecology-nawicon-glyph-nawicon.png'
              alt='himidity'
            />
            {dataz.main.humidity} %
          </Col>
          <Col>
            <img src='https://img.icons8.com/glyph-neue/25/ffffff/atmospheric-pressure.png' />{' '}
            {dataz.main.pressure} hpa
          </Col>
        </Row>
      </Container>
      <Container className='mt-3 mt-lg-5'>
        <p>Next 5 days</p>
        <hr />
        <Row>
          {week.map((jour, index) => (
            <Col className='px-3'>
              <h2 className='day_after'>{jour}</h2>
              {dataz.weather[0].main == 'Clear' ? (
                <img
                  src='https://img.icons8.com/external-line-adri-ansyah/25/ffffff/external-weather-weather-line-adri-ansyah.png'
                  alt='ensoleillé'
                />
              ) : dataz.weather[0].description == 'half cloudy sky' ? (
                <>
                  <img
                    src='https://img.icons8.com/external-color-outline-adri-ansyah/25/000000/external-weather-weather-color-outline-adri-ansyah-14.png'
                    alt='partiellement-nuageux'
                  />
                </>
              ) : dataz.weather[0].description == 'overcast clouds' ? (
                <>
                  <img src='https://img.icons8.com/external-line-adri-ansyah/25/ffffff/external-weather-weather-line-adri-ansyah-15.png' />
                </>
              ) : dataz.weather[0].description == 'light rain' ? (
                <img
                  src='https://img.icons8.com/external-line-adri-ansyah/25/ffffff/external-weather-weather-line-adri-ansyah-12.png'
                  alt='pluvieux'
                />
              ) : (
                <img
                  src='https://img.icons8.com/external-solid-adri-ansyah/25/ffffff/external-weather-weather-solid-adri-ansyah-5.png'
                  alt='pluvieux'
                />
              )}
              <p className='day_after'>{dailys.daily[index].temp.day}</p>
            </Col>
          ))}
        </Row>
      </Container>
      <Container className='mt-3 mt-lg-5'>
        <p className='day_after'>LAST UPDATE MON 8 APR 2010 10:00</p>
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
