import Profile from "./pages/Profile"
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import Course from "./pages/Course"

export const authRoutes = [
    {
        path: '/profile',
        Component: <Profile/>
    }
]

export const publicRoutes = [
    {
        path: '/',
        Component: <Home/>
    },
    {
        path: '/courses',
        Component: <Courses/>
    },
    {
        path: '/registration',
        Component: <Registration/>
    },
    {
        path: '/login',
        Component: <Login/>
    },
    {
        path: '/course/:name',
        Component: <Course/>
    }
]