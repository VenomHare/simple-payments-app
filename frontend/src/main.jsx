import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import SignUp from './pages/SignUp.jsx'
import SignIn from './pages/SignIn.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Transfer from './pages/Transfer.jsx'
import { Bounce, ToastContainer } from 'react-toastify';

export const BACKEND_ENDPOINT = "https://vdljj0vs-3001.inc1.devtunnels.ms"

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />}/>
      <Route path='/signup' element={<SignUp />}/>
      <Route path='/signin' element={<SignIn />}/>
      <Route path='/dashboard' element={<Dashboard />}/>
      <Route path='/send' element={<Transfer />}/>
    </Routes>
    <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
  </BrowserRouter>,
)
