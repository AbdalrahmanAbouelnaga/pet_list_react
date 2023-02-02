import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import reportWebVitals from './reportWebVitals';
import {Layout} from './components/Layout'

import { createBrowserRouter, RouterProvider } from 'react-router-dom';


import Login from './pages/Login';
import App from './pages/App';
import MyPets from './pages/MyPets';
import Pet from './pages/Pet'

import { AuthProvider } from './context/AuthContext';
import AddPet from './pages/AddPet';
import Search from './pages/Search';
import SignUp from './pages/SignUp';
import User from './pages/User';
import MyAccount from './pages/MyAccount';



const routes = [
  {
    path:'/',
    element:<App />
  },
  {
    path:'/login',
    element:<Login />
  },
  {
    path:'/mypets',
    element:<MyPets />
  },
  {
    path:'/add-pet',
    element:<AddPet />
  },
  {
    path:'/users/:slug/pets/:slug',
    element:<Pet />
  },
  {
    path: '/search',
    element:<Search />
  },
  {
    path:'/signup',
    element:<SignUp />
  },
  {
    path:'/users/:slug',
    element:<User />
  },
  {
    path:'/myaccount',
    element:<MyAccount />
  }
]

const router = createBrowserRouter(routes)




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <Layout>
        <RouterProvider router={router} />
      </Layout>
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
