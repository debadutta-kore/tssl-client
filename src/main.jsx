import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import 'react-toastify/dist/ReactToastify.css';
import "./index.sass";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./pages/login/index.jsx";
import AuthLayout from "./components/layout/authLayout/index.jsx";
import ProtectRoute from "./components/hoc/protectRoute/index.jsx";
import { store } from "./app/store.js";
import { Provider } from "react-redux";
import SplashScreen from "./pages/splashScreen/index.jsx";
import ChooseUser from "./pages/chooseUser/index.jsx";
import { ToastContainer } from "react-toastify";
import error from "./assets/icons/error.svg";
import success from "./assets/icons/success.svg";
import warn from './assets/icons/warn.svg';

const router = createBrowserRouter([
  {
    path: "/auth/check",
    element: <SplashScreen />,
  },
  {
    path: "/auth/*",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      }
    ],
  },
  {
    path: "/choose",
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: (
          <ProtectRoute>
            <ChooseUser />
          </ProtectRoute>
        ),
      },
    ],
  },
  {
    path: "*",
    element: (
      <ProtectRoute>
        <App />
      </ProtectRoute>
    ),
  },
]);
const changeIcon = ({type})=>{
  let icon;
  if(type==='success') {
    icon = success;
  } else if(type === 'warning') {
    icon = warn;
  } else {
    icon = error;
  }
  return <img src={icon} alt="icon" width={20} height={20}/>;
}
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ToastContainer
      icon={changeIcon}
      position="bottom-center"
      autoClose={3000}
      limit={2}
      hideProgressBar={true}
      closeButton={false}
      style={{bottom: '15%'}}
    />
      <RouterProvider router={router} />
  </Provider>
);
