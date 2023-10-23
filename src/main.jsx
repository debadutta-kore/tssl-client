import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.sass";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./pages/login/index.jsx";
import AuthLayout from "./components/layout/authLayout/index.jsx";
import ProtectRoute from "./components/protectRoute/index.jsx";
import { store } from "./app/store.js";
import { Provider } from "react-redux";
import SplashScreen from "./pages/splashScreen/index.jsx";
import ChooseUser from "./pages/chooseUser/index.jsx";

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
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
