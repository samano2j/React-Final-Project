import { useState } from 'react'
import './App.css'
import Navbar from '../src/components/Navbar'
import Table from './components/Table'

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getData } from './redux/middleware/api'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getData({mode: 'normal'}))
  }, [])

  return (
    <div>
      <Navbar />
      <Table />
    </div>
  )
}

export default App
