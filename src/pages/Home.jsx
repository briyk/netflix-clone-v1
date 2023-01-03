import React from 'react'
import Main from '../components/Main'
import Navbar from '../components/Navbar'
import Row from '../components/Row'
import requests from '../Request'

const Home = () => {
  return (
    <>
          <Navbar/>
          <Main/>
          <Row rowID="1" title="Up Coming" fetchURL={requests.requestUpcoming} />
          <Row rowID="2" title="Top Rated" fetchURL={requests.requestTopRated} />
          <Row rowID="3" title="Trending" fetchURL={requests.requestTrending} />
          <Row rowID="4" title="Popular Movies" fetchURL={requests.requestPopular} />
          <Row rowID="5" title="Horror Movies" fetchURL={requests.requestHorror} />
    </>
  )
}

export default Home