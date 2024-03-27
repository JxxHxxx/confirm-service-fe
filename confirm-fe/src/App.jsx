import './App.css'
import { Confirm } from './page/Confirm'
import { Login } from './page/Login'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  { path: "/confirm", element: <Confirm /> },
  { path: "/login", element: <Login />}
]);

function App() {

  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
