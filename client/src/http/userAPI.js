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

    console.log(cookies.get('token'))

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

    console.log(cookies.get('token'))

    return jwt_decode(cookies.get('token'))
}

export const logout = async() => {
    await fetch(`${process.env.REACT_APP_API_URL}`+'ivvkor/user/logout', {
        method: 'DELETE',
        credentials: 'include'
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

