import jwt_decode from "jwt-decode"
import Cookies from "universal-cookie"

const cookies = new Cookies()

export const registration = async (email, login, password) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}`+'ivvkor/user/registration',
        {
            method: 'POST',
            body: JSON.stringify({email, login, password}),
            headers: {
                "Content-Type": "application/json"
            }
        })

    let middleData = await response.json()
    cookies.set('token', middleData.token, {path: '/', maxAge: 60*60*24*30})
    let data = jwt_decode(middleData.token)
    console.log("reg " + data)
    return data
}

export const login = async (email, password) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}`+'ivvkor/user/login',
        {
            method: 'POST',
            body: JSON.stringify({email, password}),
            headers: {
                "Content-Type": "application/json",
            }
        })
    let middleData = await response.json()
    cookies.set('token', middleData.token, {path: '/', maxAge: 60*60*24*30})
    let data = jwt_decode(middleData.token)
    return data
}

export const check = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}`+'ivvkor/user/auth', {
            method: 'GET',
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": `Bearer ${cookies.get('token')}`
            })
    })

    let middleData = await response.json()
    cookies.set('token', middleData.token, {path: '/', maxAge: 60*60*24*30})
    return jwt_decode(middleData.token)
}