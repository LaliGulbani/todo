import React, { Component } from 'react';

export default class SearchPanel extends Component {

    state = {
        term: ''
    };

    onSearch = (e) => {
        const term = e.target.value;
        this.setState({term});
        this.props.onSearchChange(term);
    }

    render () {
        return (
            <input text="text"
                className="form-control search-input"
                placeholder="please type text to search"
                onChange={this.onSearch}
                value={this.state.term}/>
        );
    }
};
