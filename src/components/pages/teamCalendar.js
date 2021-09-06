import React, {Component} from 'react';
import {SearchPanelByDate} from '../searchPanels';
import {Row} from 'reactstrap';
import Servise from '../../servises/servise';
import {withRouter} from 'react-router-dom';
import ItemList, {Field} from '../itemList';
import './pages.css';

class TeamCalendar extends Component {

    service = new Servise();

    state = {
        data: null,
        id: this.props.match.params.id,
        year: '',
        startDate: '',
        endDate: '',
        paths: this.parsePath(),
        loading: true,
        error: false
    }

  componentDidMount() {

    if(this.state.paths[0]) {
      this.service.getTeamsCalendar(this.state.id)
      .then(data => {
        this.updateState(data);
      })
      .catch(this.onError);
    } 

    if(this.state.paths[1] && this.state.paths[2]) {
      this.service.getTeamCalendarByDate(this.state.paths[0], this.state.paths[1], this.state.paths[2])
        .then(data => {
        this.updateState(data);
      })
      .catch(this.onError);
    }      
  }

  onError = (err) => {
    this.setState({
        error: true,
        loading: false
    })
  }

  getDataByDate = () => {

    const start = this.state.startDate ? this.state.startDate : this.state.paths[1];
    const end = this.state.endDate ? this.state.endDate : this.state.paths[2];

    if(start && end) {

      this.service.getTeamCalendarByDate(this.state.id, start, end)
      .then(data => {
        this.updateState(data);
      })
      .catch(this.onError);
    }
  }

  parsePath() {
    const newSearchArr = [];

    if(this.props.location.search.length) {

      const searchArr = (this.props.location.search.split('=')).splice(1, 2);
      const [elemArr] = (searchArr[0].split('&')).splice(0, 1);
    
      newSearchArr.push(elemArr);
      newSearchArr.push(searchArr[1]); 
    }

    const idArr = this.props.location.pathname.split('/');
    const newIdArr = idArr.filter(item => Number(item));

    const newArrayPaths  = newIdArr.concat(newSearchArr);
    return newArrayPaths;
  }

  updateState(data) {
    
    const {matches} = data;

    const newData = matches.map(item => {

      const {id, competition, season, matchday, status, awayTeam, homeTeam, score} = item;
      const {startDate, endDate} = season;
      const {winner} = score;
      const {name} = competition;
      const idAwayTeam = [];
      idAwayTeam.push(awayTeam.id);

      return {
        id: id,
        competition: name,
        startDate: startDate,
        endDate: endDate,
        matchday: matchday,
        status: status,
        awayTeam: awayTeam.name,
        homeTeam: homeTeam.name,
        winner: winner
      }  
    })

    this.setState({
      data: newData,
      loading: false
    })
  }


changeRouteByDate = (id, startDate, endDate) => {

  const start = startDate ? startDate : this.state.paths[1];
  const end = endDate ? endDate : this.state.paths[2];
  this.props.history.push(`/teamcalendar/${id}/search?startDate=${start}&endDate=${end}`);
  this.setState({
    startDate,
    endDate
  }) 
}

  render() {

    return ( 
      <div> 
        <Row>
          <h2>Calendar of team</h2>
        </Row>
      
        <SearchPanelByDate getDataByDate={this.getDataByDate} defaultValue={this.state.paths} changeRouteByDate={this.changeRouteByDate} />
     
          <div className="calendar-league">
            <div>Сompetition name</div>
            <div>Start date</div>
            <div>End date</div>
            <div>Match day</div>
            <div>Status</div>
            <div>Away team</div>
            <div>Home team</div>
            <div>Winner</div>
          </div>

          <ItemList 
              data={this.state.data}
              currentPage = "TeamCalendar"
              error = {this.state.error}
              loading = {this.state.loading}
          > 

            <Field field="competition" label = "competition" />
            <Field field="startDate" label = "startDate"/>
            <Field field="endDate" label = "endDate"/>
            <Field field="matchday" label = "matchday"/>
            <Field field="status" label = "status"/>
            <Field field="awayTeam" label = "awayTeam"/>
            <Field field="homeTeam" label = "homeTeam"/>
            <Field field="winner" label = "winner"/>
        
          </ItemList>
      </div> 
    )
  }
}

export default withRouter(TeamCalendar);








