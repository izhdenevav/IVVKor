import jwt_decode from "jwt-decode"

export const registration = async (email, login, password) => {
    const response = await fetch('http://localhost:3001/ivvkor/user/registration',
        {
            method: 'POST',
            body: JSON.stringify({email, login, password}),
            headers: {
                "Content-Type": "application/json"
            }
        })

    let middleData = await response.json()
    let data = jwt_decode(middleData.token)
    localStorage.setItem("token", data.token)
    console.log(data)

    return data
}

export const login = async (email, password) => {
    const response = await fetch('http://localhost:3001/ivvkor/user/login',
        {
            method: 'POST',
            body: JSON.stringify({email, password}),
            headers: {
                "Content-Type": "application/json",
            }
        })

    let middleData = await response.json()
    let data = jwt_decode(middleData.token)
    localStorage.setItem("token", data.token)
    console.log(data)

    return data
}

export const check = async () => {
    const {data} = await fetch('http://localhost:3001/ivvkor/user/auth', {
        method: 'GET',
        headers: new Headers({
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        })
    })
    console.log(jwt_decode(data.token))
    return jwt_decode(data.token)
}