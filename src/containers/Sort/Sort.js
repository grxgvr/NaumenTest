import React, { Component } from 'react';
import './Sort.css';

class Sort extends Component{
    state = {
        type: 'relevance',
        direction: 'descending' 
    }
    sortChangeHandler = (param, value) => {
        this.setState({[param]:value});
        if(param === 'type')
            this.props.changed(value, this.state.direction);
        else 
            this.props.changed(this.state.type, value);
    }
    render(){
        return(
            <div className='info'>
                        Сортировка:<br/>
                        <select className='sort' onChange={(e) => this.sortChangeHandler('type',e.target.value)}>
                            <option value='relevance'>По релевантности</option>
                            <option value='name'>По названию</option>
                            <option value='date'>По дате редактирования</option>
                            <option value='wordCount'>По количеству слов</option>
                        </select>
                        <select className='sort' onChange={(e) => this.sortChangeHandler('direction', e.target.value)}>
                            <option value='descending'>По убыванию</option>
                            <option value='ascending'>По возрастанию</option>
                        </select>
                    </div>
        )
    }
}

export default Sort;