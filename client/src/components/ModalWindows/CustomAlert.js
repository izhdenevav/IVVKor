import React from 'react';
import {observer} from "mobx-react-lite";
import modal from "../../css-modules/modals.module.css";
import styles from "../../css-modules/signModal.module.css";

const CustomAlert = observer(({isActive, setActive, warningText, errorText}) => {
    return (
        <div onClick={() => setActive(false)} className={ isActive ? modal.modal__active : modal.modal }>
            <div className={ isActive ? modal.modal__content__active : modal.modal__content} onClick={e => e.stopPropagation()}>
                <div>
                    <h1>{warningText}</h1>
                </div>
                <div>
                    <label>{errorText}</label>
                </div>
            </div>
        </div>
    );
})

export default CustomAlert;
