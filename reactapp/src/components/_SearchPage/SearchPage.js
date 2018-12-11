// Dependencies
import React, { Component } from 'react';
// import { Route } from "react-router-dom";
import { fetchSearchResults, fetchCategoryResults } from '../../actions';
import { connect } from 'react-redux';
import './SearchPage.css';
import styled from 'styled-components';
import queryString from 'query-string';

//Import components
import {
	// SearchBar,
	ProjectTile,
	SearchPageSearchBar,
	// Nav,
	Header
} from '../../components';

const SearchPageWrapper = styled.div`
	width: 100%;
`;

class SearchPage extends Component {
	constructor() {
		super();
		this.state = { input: '' };
	} // useless constructor

	componentDidMount() {
		const values = queryString.parse(this.props.location.search);
		this.props.fetchSearchResults(values.query);
	}

	handleChange = e => {
		this.setState({ ...this.state, input: e.target.value });
	};

	handleSearch = e => {
		e.preventDefault();
		const searchTerm = this.state.input;
		console.log(searchTerm);
		//call featch search results action
		//push to search page
		this.props.fetchSearchResults(searchTerm);
		this.props.history.push(`/search?query=${searchTerm}`);
	};

	handleFilterCategoryFood = e => {
		e.preventDefault();
		const searchTerm = 'food';
		console.log(searchTerm);
		//call featch search results action
		this.props.fetchCategoryResults(searchTerm);
		//push to search page
	};

	handleFilterCategoryTech = e => {
		e.preventDefault();
		const searchTerm = 'tech';
		console.log(searchTerm);
		//call featch search results action
		this.props.fetchCategoryResults(searchTerm);
		//push to search page
	};

	handleFilterCategoryHome = e => {
		e.preventDefault();
		const searchTerm = 'Home Improvement';
		console.log(searchTerm);
		//call featch search results action
		this.props.fetchCategoryResults(searchTerm);
		//push to search page
	};
	render() {
		return (
			<SearchPageWrapper>
				<Header
					handleChange={this.handleChange}
					handleSearch={this.handleSearch}
				/>
				<div className="search-page-container">
					<div className="search-options" />
					<div className="search-results">
						<h1>Search results</h1>
						{this.props.projects.length === 0 ? <p>No projects found</p> : ''}
						<SearchPageSearchBar
							handleFilterCategoryFood={this.handleFilterCategoryFood}
							handleFilterCategoryTech={this.handleFilterCategoryTech}
							handleFilterCategoryHome={this.handleFilterCategoryHome}
							handleChange={this.handleChange}
						/>

						{this.props.projects.map(project => (
							<ProjectTile
								history={this.props.history}
								key={project.project_id}
								project={project}
							/>
						))}
					</div>
				</div>
			</SearchPageWrapper>
		);
	}
}

const mapStateToProps = state => {
	console.log(state);
	return {
		projects: state.searchReducer.projects
	};
};

export default connect(
	mapStateToProps,
	{ fetchSearchResults, fetchCategoryResults }
)(SearchPage);
