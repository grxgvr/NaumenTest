import React, { Component } from 'react';
import {FaPalette, FaTimes} from 'react-icons/fa';
import localStorage from 'local-storage';
import './Palette.css';

class Pallete extends Component {
    state = {
        isOpen: false
    }

    componentDidMount = () => {
        let color = localStorage.get('selectedTheme');
        if(color !== null)
            this.props.change(localStorage.get('selectedTheme'));
        else   
            this.props.change('blue');
    }

    togglePalette = () => {
        let toggle = !this.state.isOpen;
        this.setState({isOpen:toggle});
    }

    render(){
        let icon = this.state.isOpen ? <FaTimes onClick={this.togglePalette} className='icon'/>:
                                        <FaPalette onClick={this.togglePalette}className='icon'/>;
        let classes = this.state.isOpen ? 'paletteBox open' : 'paletteBox close';
        return(
            <div className={classes}>
                <div className='palette'>
                    <div className='theme blue' onClick={() => this.props.change('blue')}></div>
                    <div className='theme violet' onClick={() => this.props.change('violet')}></div>
                    <div className='theme green' onClick={() => this.props.change('green')}></div>
                    <div className='theme orange' onClick={() => this.props.change('orange')}></div>
                </div>
                <div className='toggle'>
                    {icon}
                </div>
            </div>
        )
    }
}

export default Pallete;