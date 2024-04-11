// import './App.css'
import { Fragment } from 'react';
import { Vacation } from './page/Vacation'
import { Header } from './page/Header';
import { Login } from './page/Login'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { CommonProvider } from './context/CommonProvider';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Header />,
    children: [
      {
        path: 'confirm',
        element: <div>결재함</div>,
      },
      {
        path: 'vacation',
        element: <Vacation />
      },
      {
        path: 'schedule',
        element: <div>스케줄 페이지</div>
      }
    ],
  },
  {
    path: '/login',
    element: <Login />
  }
]);



function App() {

  return (
    <Fragment>
      <CommonProvider>
        <RouterProvider router={router} />
      </CommonProvider>
    </Fragment>
  )
}

export default App
