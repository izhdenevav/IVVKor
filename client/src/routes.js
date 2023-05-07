import Home from "./pages/Home";
import Courses from "./pages/Courses";
import Course from "./pages/Course"
import UserProfile from "./pages/UserProfile";
import RedactProfile from "./components/ModalWindows/RedactProfile";
import AdminProfile from "./pages/AdminProfile";
import Material from "./pages/Material"
import News from "./pages/News";

export const authRoutes = [
    {
        path: '/profile',
        Component: <UserProfile/>
    },
    {
        path: '/h',
        Component: <RedactProfile/>
    },
    {
        path: '/admin',
        Component: <AdminProfile/>
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
    },
    {
        path: '/material',
        Component: <Material/>
    },
    {
        path: '/news',
        Component: <News/>
    }
]