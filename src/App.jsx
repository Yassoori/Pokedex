import { useState } from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import { PokeContextProvider } from './context/PokeContext'

import './App.css'
// import of pages:
import Homepage from './pages/Homepage'
// import of components:
import Header from "./components/Header";
import Footer from "./components/Footer";
import SinglePokemon from './components/SinglePokemon'

function App() {

  return (
    <HashRouter>
      <PokeContextProvider>
        <Header/>
        <Routes>
          {/* Set up individual routes */}
          <Route exact path='/' element={<Homepage/>} />
          {/* Route for each addtional page or component */}
          <Route path='/pokemon/' element={<SinglePokemon/>}/>
        </Routes>
        <Footer/>
      </PokeContextProvider>
    </HashRouter>
  )
}

export default App
