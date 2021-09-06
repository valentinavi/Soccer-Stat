import React, {Component} from 'react';
import ItemList, {Field} from '../itemList';
import Servise from '../../servises/servise';
import {SearchPanel} from '../searchPanels';
import {withRouter} from 'react-router-dom';
import {Row} from 'reactstrap';


class LeaguesPage extends Component {

service = new Servise();
   state = {
        data: null,
        oldData: null,
        urlId: '',
        name: '',
        paths: this.parsePath(),
        loading: true,
        error: false
   }

    componentDidMount() {
        const id = this.props.match.params.id;
 
        if (!id) {
            this.service.getAllLeagues()
                .then(data => {
                    const {competitions} = data;
                    const newData = competitions.map(item => {
                        return {
                            id: item.id,
                            name: item.name
                        }
                    })

                this.setState({
                    data: newData,
                    loading: false
                })
            })
            .catch(this.onError);
        } 

        if(id) {
            this.service.getFoundLeagues(this.props.match.params.id)
            .then(data=> {
                const obj = {
                  id: data.id,
                  name: data.name
                }
            
                this.setState({
                    data: [obj],
                    loading: false
                })
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

  
    searchForMatches(data, value) {

        let newArrData = data.filter(item => {
            if(item.name === value) {
                return item;
            }
        });
      
        let urlId = (newArrData.map(item => item.id)).toString();
        let name = (newArrData.map(item => item.name)).toString();
        
        this.setState({
            name: name,
            urlId: urlId
        }); 

        return urlId, name;
    }

    changeRoute = async () => {
        const newName = (this.state.name.split(' ')).join('+');
        await this.props.history.push(`/league/${this.state.urlId}/search?name=${newName}`); 
    } 

    parsePath() {
        const idArr = this.props.location.pathname.split('/');
        const newArrayPaths = idArr.filter(item => Number(item));
    
        if(this.props.location.search.length) {
            const search = (this.props.location.search.split('=')).splice(1, 2);
            const str_2 = search.join('');
            const arr = str_2.split('+');
            const pathName = arr.length > 1 ? `${arr[0]} ${arr[1]}` : `${arr[0]}`;
            newArrayPaths.push(pathName);
        }

        return newArrayPaths;
    }

    getData = (value) => {

        this.service.getAllLeagues()
            .then(data => {
                const {competitions} = data;

                const newData = competitions.map(item => {
                    return {
                        id: item.id,
                        name: item.name
                    }
                })
                return newData;
            })
            .then(data => {
                this.searchForMatches(data, value)
            })
            .then(() => {
                this.changeRoute();
            })
            .then(() => {
                this.service.getFoundLeagues(this.state.urlId)
                    .then(data => {

                        let obj = {
                            id: data.id,
                            name: data.name 
                        }
                        this.setState({
                            data: [obj],
                            loading: false
                        });
                    }).catch(this.onError);
            })
            .catch(this.onError);
    }

    render() {

        return ( 
            <div>
                <Row>       
                    <h2>List of leagues</h2>
                </Row>

                <SearchPanel 
                    getData={this.getData}
                    defaultValue={this.state.paths}
                />
                
                <ItemList 
                    onItemSelected = {(id) => {
                        this.props.history.push(`/teams/${id}`);
                    }}
                    onSelectedCalendar = {(id) => {
                        this.props.history.push(`/leaguecalendar/${id}`);
                    }}
                
                    data={this.state.data}
                    currentPage = "LeaguesPage"
                    buttonNameForTeam  = "List of teams"
                    buttonName  = "Calendar of league"
                    urlId = {this.state.urlId} 
                    error = {this.state.error}
                    loading = {this.state.loading}
                >

                    <Field field="name" label = "name"/>

                </ItemList>
            </div>
        )
    }
}

export default withRouter(LeaguesPage);













