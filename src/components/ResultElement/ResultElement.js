import React from 'react';
import './ResultElement.css';

const resultElement = (props) => (
    <div className='ResultElement'>
        <h1>{props.element.title}</h1>
        <hr/>
        <label>{props.element.timestamp.substring(0,10)}</label>
        <p dangerouslySetInnerHTML={{__html: '...' + props.element.snippet + '...'}}></p>
        <label>Количество слов:{props.element.wordcount}</label>
        <a href={props.element.url} target="_blank" rel="noopener noreferrer">Перейти</a>
    </div>
)

export default resultElement;