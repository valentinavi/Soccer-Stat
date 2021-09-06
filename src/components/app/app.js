import React, {Component} from 'react';
import {Container} from 'reactstrap';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {LeaguesPage, TeamsPage, LeagueCalendar, NotFoundPage, TeamCalendar} from '../pages';
import Header from '../header';
import './app.css';

export default class App extends Component {

    state = {
        paths: {
            main: '/',
            league: '/league/',
            teams: '/teams/',
            teamcalendar: '/teamcalendar/',
            leaguecalendar: '/leaguecalendar/'
        }
    }

    checkUrl(pathname, paths) {
        const arr = [];
        for (let key in paths) {
            arr.push(paths[key]);
        }  
    }
    
    render() {
        const paths = {...this.state.paths};
    
        return(
            <Router> 
                <div className="app">
                    <Container>
                        <Header />
                    </Container>
                    <Container>
                        <Switch>
                            <Route exact path = '/'> <LeaguesPage /> </Route>
                            <Route exact path = '/league'> <LeaguesPage /> </Route>
                            <Route path={`${paths.league}:id`} render={ ({match}) => {
                                const {id} = match.params;
                                paths.leagues = `/league/${id}`;
                                return <LeaguesPage />}}
                            /> 

                            <Route path={`${paths.teams}:id`} render={ ({match}) => {
                                const {id} = match.params;
                                paths.teams = `/teams/${id}`;
                                return <TeamsPage/>}}
                            />
                            <Route path={`${paths.teamcalendar}:id`} render={ ({match}) => {
                                const {id} = match.params;
                                paths.teamcalendar = `/teamcalendar/${id}`;
                                return <TeamCalendar />}}
                            />
                    
                            <Route path={`${paths.leaguecalendar}:id`} render={ ({match}) => {
                                const {id} = match.params;
                                paths.leaguecalendar = `/leaguecalendar/${id}`;
                                return <LeagueCalendar />}}
                            />

                            <Route render={({location}) => {
                               return <NotFoundPage notPage = {this.checkUrl(location.pathname, this.state.paths)}/>
                            }}/>
                   
                        </Switch>
                    </Container>
                </div>
              
            </Router>
       );
    }    
};

