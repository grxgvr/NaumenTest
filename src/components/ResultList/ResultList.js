import React from 'react';
import ResultElement from '../ResultElement/ResultElement';
import './ResultList.css';

const list = (props) => <div className='list'>
    {props.data.map(element => (
                <ResultElement element={element} key={element.pageid}/>
        )
    )}
</div>

export default list;