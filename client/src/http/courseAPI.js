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

export const findOneCourse = async (name) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}`+'ivvkor/course/' + name,
        {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        })
    return response.json()
}

export const createCourse = async (name, courseImage, description) => {

    let formData = new FormData()
    formData.append("name", name)
    formData.append("courseImage", courseImage)
    formData.append("description", description)


    const response = await fetch(`${process.env.REACT_APP_API_URL}`+'ivvkor/course/add',
        {
            method: 'POST',
            body: formData,
            credentials: 'include'
        })

    return response.json()
}



