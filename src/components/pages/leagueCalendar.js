import React, {Component} from 'react';
import {SearchPanelByYear, SearchPanelByDate} from '../searchPanels';
import {Row} from 'reactstrap';
import Servise from '../../servises/servise';
import {withRouter} from 'react-router-dom';
import ItemList, {Field} from '../itemList';
import './pages.css';

class LeagueCalendar extends Component {

    service = new Servise();

    state = {
        data: null,
        competition: '',
        id: this.props.match.params.id,
        year: '',
        startDate: '',
        endDate: '',
        paths: this.parsePath(),
        loading: true,
        error: false
    }

  componentDidMount() {
   
    if(this.state.paths[0] && !this.state.paths[1]) {
      this.service.getLeagueCalendar(this.state.id)
      .then(data => {
        this.updateState(data);
      })
      .catch(this.onError);
    } 

    if(this.state.paths[1] && !this.state.paths[2]) {
      this.service.getFoundLeaguesCalendarByYear(this.state.paths[0], this.state.paths[1])
        .then(data => {
        this.updateState(data);
      })
      .catch(this.onError);
    }

    if(this.state.paths[1] && this.state.paths[2]) {
      this.service.getFoundLeaguesCalendarByDate(this.state.paths[0], this.state.paths[1], this.state.paths[2])
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

  getDataByYear = (id, year) => {
    if(year) {
      this.service.getFoundLeaguesCalendarByYear(id, year)
      .then(data => {
        this.updateState(data);
      })
      .catch(this.onError);
    }
  }

  getDataByDate = () => {

    const start = this.state.startDate ? this.state.startDate : this.state.paths[1];
    const end = this.state.endDate ? this.state.endDate : this.state.paths[2];

    this.service.getFoundLeaguesCalendarByDate(this.state.id, start, end)
    .then(data => {
      this.updateState(data);
    })
    .catch(this.onError);
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
    
    const {competition, matches} = data;
    const {name} = competition;
        
    const newData = matches.map(item => {
      const {id, season, matchday, status, awayTeam, homeTeam, score} = item;
      const {startDate, endDate} = season;
      const {winner} = score;
      const idAwayTeam = [];
      idAwayTeam.push(awayTeam.id);

      return {
        id: id,
        startDate: startDate,
        endDate: endDate,
        matchday: matchday,
        status: status,
        idAwayTeam: awayTeam.id,
        awayTeam: awayTeam.name,
        idHomeTeam: homeTeam.id,
        homeTeam: homeTeam.name,
        winner: winner
      }  
    })

    this.setState({
      data: newData,
      competition: name,
      loading: false
    });
  }
  
  changeRoute = async (id, year) => {
    await this.props.history.push(`/leaguecalendar/${id}/search?year=${year}`);
  }

  changeRouteByDate = (id, startDate, endDate) => {

    const start = startDate ? startDate : this.state.paths[1];
    const end = endDate ? endDate : this.state.paths[2];
    this.props.history.push(`/leaguecalendar/${id}/search?startDate=${start}&endDate=${end}`);
    this.setState({
      startDate,
      endDate
    }) 
  }

  render() {
    const {competition} = this.state;

    return ( 
      <div> 
        <Row>       
          <h2>Calendar of league: {competition}</h2>
        </Row>
        <SearchPanelByDate  getDataByDate={this.getDataByDate} defaultValue={this.state.paths} changeRouteByDate={this.changeRouteByDate}/>
        <SearchPanelByYear getDataByYear={this.getDataByYear} defaultValue={this.state.paths} changeRoute={this.changeRoute}  />
        
        <div className="calendar-league">
               
          <div>Start date</div>
          <div>End date</div>
          <div>Match day</div>
          <div>Status</div>
          <div>Away team</div>
          <div>Home team</div>
          <div>Winner</div>
          <div style={{width: 23 + '%'}}>Team Сalendar </div>

        </div>

        <ItemList 
            currentPage = "LeagueCalendar"
            title="Календарь лиги"
            data={this.state.data}
            buttonNameHome = "Home"
            buttonNameAway= "Away"
            onSelectedCalendar = {(id) => {
              this.props.history.push(`/teamcalendar/${id}`);
          }}
          error = {this.state.error}
          loading = {this.state.loading}
        > 
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

export default withRouter(LeagueCalendar);

