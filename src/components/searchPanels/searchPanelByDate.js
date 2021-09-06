import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {Row} from 'reactstrap';
import Servise from '../../servises/servise';

class SearchPanelByDate extends Component {
    service = new Servise();
    state = {
        id: this.props.match.params.id,
        startDate: '',
        endDate: '',
        defaultValue: this.props.defaultValue,
        differenceTime: false
    }
  
    componentDidMount() {
      this.setDefaultValuebyDate();
    }
    handleChangeByDate = (event) => {
        
      if(event.target.getAttribute('name') === 'startDate') {
        let startDate = event.target.value;
        this.setState({
            startDate: startDate
        });
      }

      if(event.target.getAttribute('name') === 'endDate') {
          let endDate = event.target.value;
          this.setState({
              endDate: endDate
          });
      }    
    }
  
    setDefaultValuebyDate () {
        const elements = document.querySelectorAll('.date input');
        elements[0] .setAttribute('value', this.state.defaultValue[1]);
        elements[1] .setAttribute('value', this.state.defaultValue[2]);
    }

    message = () => {
      return (
        <span clasName="message">not correct </span>
      )
    }
     
    compareDates = () => {
      let start = new Date(this.state.startDate);
      let end = new Date(this.state.endDate);
      const differenceTime = start.getTime() <= end.getTime();
      return this.setState({
         differenceTime
        });
    }

    handleSubmit = async (e) => {
      e.preventDefault();
      if(this.state.differenceTime === false ) {
        await this.props.changeRouteByDate(this.state.id, this.state.startDate, this.state.endDate);
        await this.props.getDataByDate();
      } 
    }

    render() {

      return (
          <Row>
           
            <form className="date" onSubmit={this.handleSubmit}>
                <label>Find available matches by date</label>
                <label htmlFor="startDate">From</label>
                <input  type="date" id="startDate" name="startDate" onChange={this.handleChangeByDate} />
                <label htmlFor="startDate">to</label>
                <input type="date" id="endDate" name="endDate"  onChange={this.handleChangeByDate} />
                <input type="submit" value="Submit" />
            </form>
            
        </Row>
      );
    }
  }

export default withRouter(SearchPanelByDate);