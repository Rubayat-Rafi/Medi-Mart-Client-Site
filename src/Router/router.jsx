import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../MainLayout/MainLayout";
import Home from "../Pages/Home";
import JoinUs from "../Pages/JoinUs";
import SignIn from "../Components/SignIn";
import SignUp from "../Components/SignUp";
import Dashboard from "../Pages/Dashboard/Dashboard";
import HomeDash from "../Pages/Dashboard/DashBoard Page/HomeDash";
import ManageProducts from "../Pages/Dashboard/DashBoard Page/ManageAds";
import BannerAdvertise from "../Pages/Dashboard/DashBoard Page/BannerAdvertise";
import CategoryProducts from "../Pages/CategoryProducts";
import ManageMedicines from "../Pages/Dashboard/DashBoard Page/ManageMedicines";
import Shop from "../Pages/Shop";
import PrivetRoute from "./PrivetRoute";
import CartPage from "../Pages/Dashboard/DashBoard Page/CartPage";
import ManageUsers from "../Pages/Dashboard/DashBoard Page/ManageUsers";
import AdminRoute from "./AdminRoute";
import ManageCategory from "../Pages/Dashboard/DashBoard Page/ManageCategory";
import SellerRoute from "./SellerRoute";
import ManageAds from "../Pages/Dashboard/DashBoard Page/ManageAds";

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
                path: '/cart-page',
                element: <PrivetRoute><CartPage/></PrivetRoute>
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
                element: <PrivetRoute> <SellerRoute> <ManageMedicines/> </SellerRoute> </PrivetRoute>
            },
            {
                path: 'ads',
                element: <PrivetRoute> <SellerRoute> <ManageAds/> </SellerRoute>  </PrivetRoute>
            },
            {
                path: 'advertise',
                element: <PrivetRoute> <AdminRoute><BannerAdvertise/></AdminRoute> </PrivetRoute>
            },
            {
                path: 'users',
                element: <PrivetRoute> <AdminRoute> <ManageUsers/> </AdminRoute> </PrivetRoute>
            },
            {
                path: 'manage-category',
                element: <PrivetRoute> <AdminRoute> <ManageCategory /> </AdminRoute> </PrivetRoute>
            },
        ]
    }
])