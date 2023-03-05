import React from 'react';
import styles from '../css-modules/quote.module.css';
import {observer} from "mobx-react-lite";

const Quote = ({korean, russian}) => {
    return (
        <div className={ styles.containerQuote }>
            <label className={ styles.koreanQuote }>{korean}</label>
            <label className={ styles.russianQuote }>{russian}</label>
        </div>
    );
};

export default Quote;