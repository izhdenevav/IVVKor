import jwt_decode from "jwt-decode"
import Cookies from 'universal-cookie'

const cookies = new Cookies()

const errorHandler = async (response: Response) => {
    if (response.status !== 200) {
        const responseData = await response.json();
        throw Error(responseData.message);
    }
};

export const registration = async (email: string, login: string, password: string) => {
    console.log(email, login, password)
    const response = await fetch(`${process.env.REACT_APP_API_URL}`+'ivvkor/user/registration',
        {
            method: 'POST',
            body: JSON.stringify({email, login, password}),
            credentials: 'include',
            headers: {
                'content-type': 'application/json'
            }
        })

    await errorHandler(response)

    return jwt_decode(cookies.get('token'))
}

export const login = async (email: string, password: string) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}`+'ivvkor/user/login',
        {
            method: 'POST',
            body: JSON.stringify({email, password}),
            credentials: 'include',
            headers: {
                'content-type': 'application/json'
            }
        })

    await errorHandler(response)

    return jwt_decode(cookies.get('token'))
}

export const logout = async() => {
    await fetch(`${process.env.REACT_APP_API_URL}`+'ivvkor/user/logout', {
        method: 'DELETE',
        credentials: 'include'
    })
}

export const getUserCourses = async(id: number) => {
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

export const addUserCourse = async(userId: number, courseId: number) => {
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

export const updatePassword = async(email: string, oldPassword: string, newPassword: string) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}`+'ivvkor/user/updatePassword', {
        method: 'POST',
        body: JSON.stringify({email, oldPassword, newPassword}),
        credentials: 'include',
        headers: {
            'content-type': 'application/json'
        }
    })

    await errorHandler(response)
}

export const deleteAccount = async(email: string) => {
    await fetch(`${process.env.REACT_APP_API_URL}`+'ivvkor/user/deleteAccount', {
        method: 'DELETE',
        body: JSON.stringify({email}),
        credentials: 'include',
        headers: {
            'content-type': 'application/json'
        }
    })
}

