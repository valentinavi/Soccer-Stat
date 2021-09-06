import React, {Component} from 'react';
import './searchPanels.css';
import {Row} from 'reactstrap';


export default class  SearchPanel extends Component {

    state = {
        value: '',
        defaultValue: this.props.defaultValue
    }

    componentDidMount() {
        this.setDefaultValue();
    }
    
    setValue = (value) => { this.setState( {value} ) }

    setDefaultValue() {
        const input = document.querySelector('.search-by-name input');
        if(!this.props.defaultValue[1]) {
            input.setAttribute('value', '');
        } else if(this.props.defaultValue[1]) {
            input.setAttribute('value', this.props.defaultValue[1]);
        }
    }
   
    render () {
        return (
            <Row>
                <form className="search-by-name" id="searsh"
                    onSubmit={(e) => {
                        e.preventDefault();
                        this.props.getData(this.state.value) }}
                >

                    <label htmlFor="search"> Find available matches by name </label>
                    <input className="form-controll search-input"
                        type="search"
                        placeholder="Введите название"

                        onChange = {(e) => {
                            e.preventDefault();
                             this.setValue(e.target.value);
                        }}

                        onKeydown  = {(e) => {
                            e.preventDefault();
                        
                            if (e.key === 'Enter') {
                                e.stopPropagation();
                                this.props.getData(this.state.value);
                                this.onSubmit();
                            }
                        }}
                        name="search" id="search" >   
                    </input>
                    <input type="submit" value="Submit" />

                </form>
            </Row>
        )
    }
}
SearchPanel.defaultProps = {
    defaultValue: ''
}
