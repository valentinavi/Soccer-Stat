import React, {Component} from 'react';
import ErrorMessage from '../errorMessage';
import Spinner from '../spinner';
import './itemList.css';

const Field = ({item, field}) => {
    return (
        <div >{item[field]}</div>    
    )
}

export {Field};

export default class ItemList extends Component {
   
    renderItems(data) {
        const {buttonName, buttonNameForTeam, currentPage, buttonNameHome, buttonNameAway, urlId} = this.props;
     
        return data.map((item) => {

            const btnLeft = currentPage === "LeaguesPage" 
            || currentPage === "TeamsPage" 
             ? <div className="btn btn-left" onClick={(e) => {
                    this.props.onSelectedCalendar(item.id, item.name)}}>
                    {buttonName}
                </div> : null;
                                                            
            const btnRight = currentPage === "LeaguesPage" 
             ? <div className="btn btn-right" onClick={(e) => {
                    this.props.onItemSelected(item.id) }}> 
                    {buttonNameForTeam} 
                </div> : null;

            const btnAwayTeam =  currentPage === "LeagueCalendar" 
            ? <div className="btn btn-left" onClick={(e) => {
                this.props.onSelectedCalendar(item.idAwayTeam)}}>
                    {buttonNameAway}
                </div> : null;
            const btnHomeTeam =  currentPage === "LeagueCalendar"
             ? <div className="btn btn-right" onClick={(e) => {
                this.props.onSelectedCalendar(item.idHomeTeam)}}>
                    {buttonNameHome}
                </div> : null;
     
            return (

                <li key={item.id} className="list-group-item my-style-li" >
                
                    {
                        React.Children.map(this.props.children, (child) => {
                            return React.cloneElement(child, {item})
                        })
                    }
                    {btnLeft}
                    {btnRight}
                    {btnAwayTeam}
                    {btnHomeTeam}

                </li>
            )  
        });
    }

    render() {
        const {data, error, loading} = this.props;

        const errorMessage = error === true ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const items = !(loading || error) && data ? this.renderItems(data) : null; 
      
        return (
            <div>
                 {errorMessage}
                 {spinner} 
           
                <ul className="list-group my-style-ul">
                     {items}
                </ul>  
            </div>   
        );
    }
}





































