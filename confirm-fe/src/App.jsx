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
import WorkTicketApplicationPage from './page/work/apply/WorkTicketApplicationPage';
import ReceiveWorkTicketPage from './page/work/receive/ReceiveWorkTicketPage';
import RequestWorkTicketPage from './page/work/request/RequestWorkTicketPage';
import { URL_WORKTICKET_APPLY, URL_CONFIRM_DEPARTMENT, URL_CONFIRM_DRAFT, URL_CONFIRM_MY, URL_LOGIN, URL_WORKTICKET_RECEIVE, URL_WORKTICKET_REQUEST, URL_VACATION, URL_VACATION_APPLY, URL_VACATION_HIST, URL_VACATION_MY, URL_WORKTICKET_RECEIVE_ONE } from './constant/pageURL';
import OneReceiveWorkTicketPage from './page/work/receive/OneReceiveWorkTicketPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Header />,
    children: [],
  },
  {
    path: URL_CONFIRM_DEPARTMENT,
    element: <DepartmentConfirmDocumentPage />,
  },
  {
    path: URL_CONFIRM_MY,
    element: <MyConfirmDocument />
  },
  {
    path: URL_CONFIRM_DRAFT,
    element: <ConfirmDocumentDraftPage />
  },
  {
    path: '/schedule',
    element: <Schedule />
  },
  {
    path: URL_LOGIN,
    element: <Login />
  }
  ,
  {
    path: URL_VACATION,
    element: <Vacation />
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
    path: URL_VACATION_APPLY,
    element: <VacationApply />,
  },
  {
    path: URL_VACATION_MY,
    element: <MyVacation />
  },
  {
    path: URL_VACATION_HIST,
    element: <LeaveHistoryPage />
  },
  {
    path: URL_WORKTICKET_APPLY,
    element: <WorkTicketApplicationPage />
  },
  {
    path: URL_WORKTICKET_RECEIVE,
    element: <ReceiveWorkTicketPage />
  },
  {
    path : URL_WORKTICKET_RECEIVE_ONE,
    element: <OneReceiveWorkTicketPage />
  },
  {
    path: URL_WORKTICKET_REQUEST,
    element: <RequestWorkTicketPage />
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
