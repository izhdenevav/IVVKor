import Home from "./pages/Home";
import Courses from "./pages/Courses";
import Course from "./pages/Course"
import UserProfile from "./pages/UserProfile";

export const authRoutes = [
    {
        path: '/profile',
        Component: <UserProfile/>
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
        path: '/course/:name',
        Component: <Course/>
    }
]