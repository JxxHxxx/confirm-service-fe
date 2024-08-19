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
import MyVacation from './page/vacation/MyVacation';
import ApprovalLine from './page/vacation/ApprovalLine';
import Modal from 'react-modal';
import Schedule from './page/schedule/Schedule';
import MyConfirmDocument from './page/confirm/MyConfirmDocument';
import VacationSidebar from './page/vacation/VacationSidebar';
import Page from './components/layout/Page';
import LeaveHistoryPage from './page/vacation/history/LeaveHistoryPage';
import { VacationApply } from './page/vacation/apply/VacationApply';
import { DepartmentConfirmDocumentPage } from './page/confirm/DepartmentConfirmDocumentPage';
import ConfirmDocumentDraftPage from './page/confirm/draft/ConfirmDocumentDraftPage';
import WorkRequestPage from './page/work/request/WorkRequestPage';
import MyWorkTicketPage from './page/work/myWork/MyWorkTicketPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Header />,
    children: [],
  },
  {
    path: '/confirm',
    element: <DepartmentConfirmDocumentPage />,
  },
  {
    path: '/confirm/my-confirm',
    element: <MyConfirmDocument />
  },
  {
    path : '/confirm/draft',
    element: <ConfirmDocumentDraftPage />
  },
  {
    path: '/vacation/:vacationId/ApprovalLine',
    element: <Page
      header={<Header />}
      sidebar={<VacationSidebar />}>
      <ApprovalLine />
    </Page>
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
  {
    path: '/vacation/leave-hist',
    element: <LeaveHistoryPage />
  },
  {
    path : '/work',
    element: <WorkRequestPage />
  },
  {
    path : '/work/search',
    element: <MyWorkTicketPage />
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
