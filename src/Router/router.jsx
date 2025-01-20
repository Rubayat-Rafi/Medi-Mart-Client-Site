import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../MainLayout/MainLayout";
import Home from "../Pages/Home";
import JoinUs from "../Pages/JoinUs";
import SignIn from "../Components/SignIn";
import SignUp from "../Components/SignUp";
import Dashboard from "../Pages/Dashboard/Dashboard";
import HomeDash from "../Pages/Dashboard/DashBoard Page/HomeDash";
import ManageProducts from "../Pages/Dashboard/DashBoard Page/ManageProducts";
import BannerAdvertise from "../Pages/Dashboard/DashBoard Page/BannerAdvertise";
import Users from "../Pages/Dashboard/DashBoard Page/Users";
import CategoryProducts from "../Pages/CategoryProducts";
import ManageMedicines from "../Pages/Dashboard/DashBoard Page/ManageMedicines";
import Shop from "../Pages/Shop";
import PrivetRoute from "./PrivetRoute";
import CartPage from "../Pages/Dashboard/DashBoard Page/CartPage";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout/>,
        children : [
            {
                path:'/',
                element: <Home/>
            },
            {
                path: '/category/:category',
                element: <CategoryProducts/>
            },
            {
                path: '/shop',
                element: <Shop/>
            },
            {
                path:'/join-us',
                element: <JoinUs/>,
                children : [
                    {
                        index: true,
                        element: <SignIn/>
                    },
                    {
                        path: 'signUp',
                        element: <SignUp/>
                    },
                ]
            },


        ]
    },
    {
        path: '/dashboard',
        element: <PrivetRoute><Dashboard/></PrivetRoute>,
        children : [
            {
                index: true,
                element: <HomeDash/>
            },
            {
                path: 'manage-medicines',
                element: <PrivetRoute><ManageMedicines/></PrivetRoute>
            },
            {
                path: 'cart-page',
                element: <PrivetRoute><CartPage/></PrivetRoute>
            },
            {
                path: 'products',
                element: <PrivetRoute><ManageProducts/></PrivetRoute>
            },
            {
                path: 'advertise',
                element: <PrivetRoute><BannerAdvertise/></PrivetRoute>
            },
            {
                path: 'users',
                element: <PrivetRoute><Users/></PrivetRoute>
            },
        ]
    }
])