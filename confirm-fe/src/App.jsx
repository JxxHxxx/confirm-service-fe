// import './App.css'
import { Fragment, useEffect } from 'react';
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
import Modal from 'react-modal';

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
