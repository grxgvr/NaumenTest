import React from 'react';
import './PageControl.css';

const control = (props) => {
    let controls = [], classes;
    for (let i = 1; i <= props.totalpages; i++) {
        classes = i === props.current ? 'PageBtn Current' : 'PageBtn'
        controls.push(<span key={i} className={classes} onClick={() => props.pagechange(i)}>{i}</span>)
    }
    return(
        <div className='Controls'>
            {controls}
        </div>
    )
}

export default control;