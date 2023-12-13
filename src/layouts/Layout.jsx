import React, { Children } from 'react'
import Spinner from '../components/Spinner'
import Header from '../components/Header'

const Layout = () => {
  return (
    <main>
        <Header />
        <Spinner/>               
    </main>
  )
}

export default Layout