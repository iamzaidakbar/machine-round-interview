import { createBrowserRouter } from "react-router-dom";
import Login from '../Components/Login/login';
import Dashboard from "../Components/Dashboard/Dashboard";



const Router = createBrowserRouter([
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/dashboard",
        element: <Dashboard />
    }
]);
export default Router