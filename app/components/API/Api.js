import React, { Component, PropTypes } from 'react';
import axios from 'axios';

class API extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {}
        };
        axios.get('http://www.ltconline.ca/webwatch/MobileAda.aspx?r=11&d=4')
            .then((data) => {
                console.log(data);
                this.setState({
                    data: data.data
                });
            });
    }

    render() {
        return (
            <div >
                {!this.state.data ? '' : this.state.data}
            </div>
        );
    }
}

export default API;

