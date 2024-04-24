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
import { Confirm } from './page/Confirm';
import { VacationApply } from './components/vacation/VacationApply';
import MyVacation from './components/vacation/MyVacation';
import ApprovalLine from './components/vacation/ApprovalLine';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Header />,
    children: [
      {
        path: 'confirm',
        element: <Confirm />,
      },
      {
        path: 'vacation',
        element: <Vacation />
      },
      {
        path: '/vacation/apply',
        element: <VacationApply />,
      },
      {
        path: '/vacation/vacation-id/ApprovalLine',
        element: <ApprovalLine />
      },
      {
        path: '/vacation/myVacation',
        element: <MyVacation />
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
