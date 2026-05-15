import { useState } from 'react'
import './index.css'
import  WeatherBox from './WeatherBox'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <WeatherBox/>
    </>
  )
}

export default App