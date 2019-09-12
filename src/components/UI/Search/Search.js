import React from 'react';
import Button from '../Button/Button';
import './Search.css';

const search = (props) => {
    const boxClasses = props.start ? 'SearchBox Start' : 'SearchBox';
    return(
        <div className={boxClasses}>
            <input className='SearchBar' placeholder='Начните поиск здесь' onKeyPress={(event) => event.key === 'Enter' ? props.search() : null }/>
            <Button click={() => props.search()}>Найти</Button>
        </div>
    )
}

export default search;