import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import CreatePost from './components/CreatePost'
import ViewPost from './components/ViewPost'
import NavBar from './components/NavBar'


function App() {

  return (
      <BrowserRouter>
        <div className='components'>
          <NavBar/>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path='/new' element={<CreatePost/>}/>
            <Route path='/view/:id' element={<ViewPost/>}/>
          </Routes>
        </div>
      </BrowserRouter>
    
  )
}

export default App
