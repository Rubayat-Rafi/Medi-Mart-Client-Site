import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../MainLayout/MainLayout";
import Home from "../Pages/Home";
import JoinUs from "../Pages/JoinUs";
import SignIn from "../Components/SignIn";
import SignUp from "../Components/SignUp";

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
])