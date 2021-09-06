import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import Servise from '../../servises/servise';
import {Row} from 'reactstrap';

class SearchPanelByYear extends Component {
    service = new Servise();

    state = {
        id: this.props.match.params.id,
        year: '',
        defaultValue: this.props.defaultValue
    }
  
    componentDidMount() {
        this.setDefaultValuebyYear();
    }
  
    handleChangeYear = async (e) => {
        e.preventDefault();
        let newYear = await e.target.value;
        this.setState({
            year: newYear
        });
    }

    setDefaultValuebyYear() {
        const elements = document.querySelectorAll('.search-by-year option');
        elements.forEach(element => {
            if(element.value === this.state.defaultValue[1]) {
                return element.setAttribute('selected', 'selected')
            } else {
                return element.removeAttribute('selected')
            }
        });
    } 
 
    render() {
     
      return (
        <Row>
            <form className="search-by-year" onSubmit={(e) => {
                e.preventDefault();
                this.props.changeRoute(this.state.id, this.state.year);
                this.props.getDataByYear(this.state.id, this.state.year);
                }}>
                <label htmlFor="years">Find available matches by year </label>
                <select 
                    onChange = {(e) => this.handleChangeYear(e)}
                    name="year" id="year">

                    <option value="2021" >2021</option> 
                    <option value="2018">2018</option> 
                    <option value="2019">2019</option> 
                    <option value="2020">2020</option>
                    
                </select>
                <input type="submit" value="Submit" />
            </form>
        </Row>
      );
    }
}

SearchPanelByYear.defaultProps = {
    defaultValue: 2021
}

export default withRouter(SearchPanelByYear);