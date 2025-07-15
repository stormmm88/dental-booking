import LayoutDefault from "../Layout/LayoutDefault";
import Home from "../pages/home";
import Login from "../pages/login";
import Register from "../pages/register";
import Logout from "../pages/logout";
import ServicePage from "../pages/servicePage";
import PrivateRouter from "../components/PrivateRouter";
import BookingPage from "../pages/BookingPage";
import ConsultPage from "../pages/ConsultPages";
import MyBookings from "../pages/MyBookings";
import Profile from "../pages/Profile";
import Rating from "../pages/Rating";

export const routes = [
    {
        path: "/",
        element: <LayoutDefault />,
        children: [
            {
                index: true, // Thêm index route cho trang chủ
                element: <Home />
            },
            {
                path: "home",
                element: <Home />
            },
            {
                path: "login",
                element: <Login />
            },
            {
                path: "register",
                element: <Register />
            },
            {
                path: "logout",
                element: <Logout />
            },
            {
                path: "servicePage",
                element: <ServicePage />
            },
            {
                path: "bookingPage",
                element: <BookingPage />
            },
            {
                element: <PrivateRouter />,
                children: [
                    {
                        path: "consultPage",
                        element: <ConsultPage />
                    },
                    {
                        path: "myBookings",
                        element: <MyBookings />
                    },
                    {
                        path: "profile/:id",
                        element: <Profile />
                    },
                    {
                        path: "rating",
                        element: <Rating />
                    }
                ]
            }
        ]
    }
];