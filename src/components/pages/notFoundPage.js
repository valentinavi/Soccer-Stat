import React, {Component} from 'react';
import {Row} from 'reactstrap';
import {Link} from 'react-router-dom';

export default class NotFoundPage extends Component {
   
    render() {
    
        return (
            <Row>
                <h2>Link is not defined </h2>
                <button className="not-found-page"><Link to='/'>Back to main page</Link></button>
            </Row>
        )
    }
}

