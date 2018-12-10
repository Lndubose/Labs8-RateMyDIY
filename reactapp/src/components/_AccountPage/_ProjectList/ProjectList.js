import React, { Component } from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { AccountSideBar, Nav } from '../../../components';
import { Header } from '../../../components';
import { ProjectRender } from '../../../components';
import './ProjectList.css';

import {
	loggedIn,
	fetchMyProjects,
	fetchSearchResults,
	fetchCategoryResults
} from '../../../actions';

class ProjectList extends Component {
	constructor(props) {
		super(props);
		this.state = { input: '' };
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

	componentDidMount() {
		// this.props.fetchMyProjects(this.props.userInfo.user_id);

		this.props.loggedIn(fetchMyProjects);
	}
	render() {
		return (
			<div className="projectPage">
				<Header
					handleChange={this.handleChange}
					handleSearch={this.handleSearch}
				/>
				<Nav />
				<div className="project-list-container">
					<AccountSideBar />

					<div className="myProjectsDisplay">
						{this.props.myProjects.map(myProject => (
							<ProjectRender
								myProjectProject_id={myProject.project_id}
								myProjectProject_name={myProject.project_name}
								myProjectImg_url={myProject.img_url}
								myProjectProject_rating={myProject.project_rating}
							/>
						))}
						<div className="addNew">
							<h2>New Project</h2>
							<Link to="/newproject">
								<img
									alt="PLACEHOLDER! alt text"
									src="http://chittagongit.com//images/plus-button-icon/plus-button-icon-13.jpg"
								/>
							</Link>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

// ProjectList.propTypes = {
// 	classes: PropTypes.object.isRequired
// };

const mapStateToProps = state => {
	return {
		myProjects: state.myProjectReducer.myProjects,
		userInfo: state.loggedInReducer.userInfo
	};
};

export default connect(
	mapStateToProps,
	{ loggedIn, fetchSearchResults, fetchCategoryResults, fetchMyProjects }
)(ProjectList);
