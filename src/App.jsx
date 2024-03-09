import { useState } from 'react'
import './App.css'
import Header from './Components/Header';
import Nav from './Components/Nav';
import SimpleBottomNavigation from './Components/Nav';
import MovieFinder from './Components/MovieFinder'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';


function App() {

  const router = createBrowserRouter(createRoutesFromElements(
    <Route path='/' element={<MovieFinder />}>
      
    </Route>
  ))

  return (
  <div>
    <RouterProvider router={router} />
  </div>

  )
}

export default App
