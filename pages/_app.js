import React from 'react'
import '../css/styles.css'

const MyApp = ({Component, pageProps}) => {
  return (
      <Component {...pageProps} />
  )
}

export default MyApp