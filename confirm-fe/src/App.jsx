// import './App.css'
import { Fragment } from 'react';
import { Confirm } from './page/Confirm'
import { Header } from './page/Header';
import { Login } from './page/Login'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Test } from './components/test/Test';

const router = createBrowserRouter([
  {
    path: "/confirm",
    element: <Confirm />,
    children: [
      {
        path: "/test",
        element: <Test />,
      },
    ],
  },
]);




function App() {

  return (
    <Fragment>
      <RouterProvider router={router} />
    </Fragment>
  )
}

export default App
