export const getAllCourses = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}`+'ivvkor/course/all',
        {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        })
    return response.json()
}

