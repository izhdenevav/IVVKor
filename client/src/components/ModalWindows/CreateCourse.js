import React, {useRef, useState} from 'react';
import {observer} from "mobx-react-lite";
import styles from "../../css-modules/createCourse.module.css"
import {createCourse} from "../../http/courseAPI"
import {login} from "../../http/userAPI";

const CreateCourse = observer(({isActive, setActive}) => {
    const [selectedImage, setSelectedImage] = useState(null)

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [courseImage, setCourseImage] = useState(null)

    const showImage = (e) => {
        setSelectedImage(URL.createObjectURL(e.target.files[0]))
        setCourseImage(e.target.files[0])
    }

    const uploadImage = async() => {
        try {
            await createCourse(name, courseImage, description)
            setActive(false);
        } catch (err) {
            alert(err.message)
        }
    }

    return (
        <div className={ isActive ? styles.modal__active : styles.modal } onClick={() => setActive(false)}>
            <div className={ isActive ? styles.modal__content__active : styles.modal__content } onClick={e => e.stopPropagation()}>
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Введите название курса..." className={ styles.name } type="text"/>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Введите описание курса..." className={ styles.description }/>
                <div>
                    <img className={ styles.upload__image } src={selectedImage}/>
                </div>
                <input className={ styles.upload__image__button } type="file" onChange={(e) => showImage(e)}/>
                <button onClick={uploadImage} className={ styles.add__button }>Добавить</button>
            </div>
        </div>
    );
})

export default CreateCourse;