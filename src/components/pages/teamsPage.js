import React, {Component} from 'react';
import ItemList, {Field} from '../itemList';
import Servise from '../../servises/servise';
import {withRouter} from 'react-router-dom';
import {SearchPanel, SearchPanelByYear} from '../searchPanels';
import {Row} from 'reactstrap';

class TeamsPage extends Component {

  service = new Servise();
   
   state = {
       data: null,
       urlId: '',
       name: '',
       paths: this.parsePath(),
       nameTeam: '',
       year: '',
       loading: true,
       error: false
   }

  componentDidMount() {
    
    this.getNameTeam();
    this.getYear();

    if(this.state.paths[0] && !this.state.paths[1]) {
      this.service.getAllTeams(this.state.paths[0])
      .then(data => {
          this.updateData(data);
      })
      .catch(this.onError);
    }

    if(this.props.location.search.includes('name')) {
      this.service.getFoundTeam(this.state.paths[0])
        .then(data => {

            let obj = {
              id: data.id,
              name: data.name,  
              }
    
            this.setState({
                data: [obj],
                loading: false
            }) 
        })
        .catch(this.onError);
    }
  
    if(this.props.location.search.includes('year'))  {
      this.service.getFoundTeamsByYear(this.state.paths[0], this.state.paths[1])
      .then(data => {
        this.updateData(data);
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

  getData = (value) => {
    this.service.getAllTeams(this.state.paths[0])
      .then(data => {
        const {teams} = data;
        const newData = teams.map(item => {
            return {
                id: item.id,
                name: item.name
            }
        })
        return newData;
      })
      .then(data => { this.searchForMatches(data, value) })
      .then(() => {
          const newName = (this.state.name.split(' ')).join('+');
          this.changeRoute(this.state.urlId, newName);
      })
      .then(() => {
          this.service.getFoundTeam(this.state.urlId)
            .then(data => {
              let obj = {
                id: data.id,
                name: data.name,  
              }
    
              this.setState({
                  data: [obj],
                  loading: false
              })
            })
            .catch(this.onError); 
      })    
      .catch(this.onError); 
  }


updateData(data) {
    const {teams} = data;
    const newData = teams.map(item => {
      return {
          id: item.id,
          name: item.name,  
        }
    });

    this.setState({
        data: newData,
        loading: false
    });
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

  return newArrData;
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

getDataByYear = (id, year) => {
  if(year) {
    this.service.getFoundTeamsByYear(id, year)
    .then(data => {

      const newData = data.teams.map(item => {
        return {
          id: item.id,
          name: item.name,  
        }
      });

        this.setState({
            data: newData,
            loading: false
        });
      })
  }
}

changeRouteByYaer = async (id, year) => {
  await this.props.history.push(`/teams/${id}/search?year=${year}`);
  await this.getYear();
}

changeRoute = async () => {
  const newName = (this.state.name.split(' ')).join('+');
  await this.props.history.push(`/teams/${this.state.urlId}/search?name=${newName}`); 
  await this.getNameTeam();
} 

getNameTeam() {

  if(this.props.location.search.length > 0) {
    let part = this.props.location.search.split('=');
   
    const newPart = part[1].split('+'); 
    const nameTeam = newPart.join(' ');

    this.setState({
      nameTeam
    })
    return nameTeam;
  }
}

  getYear() {

    if(this.props.location.search.length > 0) {
      let part = this.props.location.search.split('?');
      let newPart = part[1].split('=');
      let year = newPart[0];

      this.setState({
        year
      })
      return year;
    }
  }



  renderPanelbyYear = () => {
    if(this.state.year !== 'name' && this.state.year.length|| !this.state.nameTeam) {
      return  <SearchPanelByYear defaultValue={this.state.paths} getDataByYear={this.getDataByYear} changeRoute={this.changeRouteByYaer}/> 
    } 
  }

  renderSearshPanel = () => {
    if(this.state.year !== 'year') {
      return  <SearchPanel getData={this.getData}  defaultValue={this.state.paths} />
    } 
  }

  render() {
    const searshPanelbyYear = this.renderPanelbyYear();
    const searshPanel = this.renderSearshPanel();
    return (

      <div>
         <Row>       
            <h2>List of teams</h2>
          </Row>

          {searshPanel}
          {searshPanelbyYear}
       
        <ItemList 
          onSelectedCalendar = {(id, name) => {
            const newName = (name.split(' ')).join('+');
            this.props.history.push(`/teamcalendar/${id}/?name=${newName}`);
          }}
          data={this.state.data}
          title="Список команд"
          currentPage = "TeamsPage"
          buttonName = "Calendar of team"
          error = {this.state.error}
          loading = {this.state.loading}
        > 
          <Field field="name" label = "name"/>
        </ItemList>  
      </div>
    )
  }
}

export default withRouter(TeamsPage);







