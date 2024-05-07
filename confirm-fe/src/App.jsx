// import './App.css'
import { Fragment, useEffect } from 'react';
import { Vacation } from './page/vacation/Vacation'
import { Header } from './components/layout/Header';
import { Login } from './page/login/Login'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { CommonProvider } from './context/CommonProvider';
import { Confirm } from './page/confirm/Confirm';
import { VacationApply } from './page/vacation/VacationApply';
import MyVacation from './page/vacation/MyVacation';
import ApprovalLine from './page/vacation/ApprovalLine';
import Modal from 'react-modal';
import Schedule from './page/schedule/Schedule';
import MyConfirmDocument from './page/confirm/MyConfirmDocument';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Header />,
    children: [],
  },
  {
    path: '/confirm',
    element: <Confirm />,
  },
  {
    path: '/confirm/my-confirm',
    element: <MyConfirmDocument />
  },
  {
    path: '/vacation/vacation-id/ApprovalLine',
    element: <ApprovalLine />
  },
  {
    path: '/schedule',
    element: <Schedule />
  },
  {
    path: '/login',
    element: <Login />
  }
  ,
  {
    path: '/vacation',
    element: <Vacation />
  },
  {
    path: '/vacation/apply',
    element: <VacationApply />,
  },
  {
    path: '/vacation/myVacation',
    element: <MyVacation />
  },
]);



function App() {
  useEffect(() => {
    Modal.setAppElement('#root'); // #root는 모달의 애플리케이션 요소로 지정할 요소의 ID입니다.
  }, []);

  return (
    <Fragment>
      <div id="root">
        <CommonProvider>
          <RouterProvider router={router} />
        </CommonProvider>
      </div>
    </Fragment>
  )
}

export default App
