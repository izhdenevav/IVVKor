import jwt_decode from "jwt-decode"
import Cookies from 'universal-cookie'

const cookies = new Cookies()

export const registration = async (email, login, password) => {
    await fetch(`${process.env.REACT_APP_API_URL}`+'ivvkor/user/registration',
        {
            method: 'POST',
            body: JSON.stringify({email, login, password}),
            credentials: 'include'
        })

    return jwt_decode(cookies.get('token'))
}

export const login = async (email, password) => {
    await fetch(`${process.env.REACT_APP_API_URL}`+'ivvkor/user/login',
        {
            method: 'POST',
            body: JSON.stringify({email, password}),
            credentials: 'include',
            headers: {
                'content-type': 'application/json'
            }
        })

    return jwt_decode(cookies.get('token'))
}

export const logout = async() => {
    await fetch(`${process.env.REACT_APP_API_URL}`+'ivvkor/user/logout', {
        method: 'DELETE',
        credentials: 'include'
    })
}

export const getUserCourses = async(id) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}`+'ivvkor/user/getUserCourses',
        {
            method: 'POST',
            body: JSON.stringify({id}),
            headers: {
                'content-type': 'application/json'
            }
        })

    return response.json()
}

export const addUserCourse = async(userId, courseId) => {
    await fetch(`${process.env.REACT_APP_API_URL}`+'ivvkor/user/addUserCourse',
        {
            method: 'POST',
            body: JSON.stringify({userId, courseId}),
            headers: {
                'content-type': 'application/json'
            }
        })
}

export const check = async() => {
    await fetch(`${process.env.REACT_APP_API_URL}`+'ivvkor/user/auth', {
        method: 'GET',
        headers: {
            "Authorization": `${cookies.get('token')}`
        }
    })

    return jwt_decode(cookies.get('token'))
}

