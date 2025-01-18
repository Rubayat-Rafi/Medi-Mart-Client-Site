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

            {
                path: '/dashboard',
                element:<Dashboard/>,
                children : [
                    {
                        index: true,
                        element: <HomeDash/>
                    },
                    {
                        path: 'products',
                        element: <ManageProducts/>
                    },
                    {
                        path: 'advertise',
                        element: <BannerAdvertise/>
                    },
                    {
                        path: 'users',
                        element: <Users/>
                    },
                ]
            }
        ]
    },
])