// Dependencies
import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom'; // removed Link from import (unused)
import styled from 'styled-components';
import { connect } from 'react-redux';
import { loggedIn } from '../../actions/index';
import WithTheme from '../WithTheme/WithTheme';

// Components
import {
	ReviewList,
	LandingPage,
	ProjectList,
	CreateEditPage,
	UserSettings,
	//  SearchBar, // not used
	SearchPage,
	ProjectPage,
	NewProject,
	AboutTheTeam
} from '../../components';

//Styles
const AppContainer = styled.div`
	display: flex;
	max-width: 100%;
	min-width: 600px;
	height: auto;

	margin: 0 auto;
`;

class App extends Component {
	state = {};

	componentDidMount() {
		this.props.loggedIn();
	}

	render() {
		return (
			<WithTheme>
				<AppContainer>
					{/* <h1>Navigation</h1> */}
					{/* <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/ReviewList">Review List</Link>
          </li>
          <li>
            <Link to="/settings">Settings</Link>
          </li>
          <li>
            <Link to="/search">Search Page</Link>
          </li>
          <li>
            <Link to="/signin">Sign Up or Sign In</Link>
          </li>
        </ul> */}
					{/* <Navbar /> */}
					<Route exact path="/" component={LandingPage} />

					<Route exact path="/ReviewList" component={ReviewList} />
					<Route exact path="/ProjectList" component={ProjectList} />
					<Route exact path="/CreateEditPage" component={CreateEditPage} />
					<Route path="/settings" component={UserSettings} />
					<Route path="/search" component={SearchPage} />
					<Route path="/project/:project_id" component={ProjectPage} />
					<Route path="/newproject" component={NewProject} />
					<Route path="/about" component={AboutTheTeam} />
				</AppContainer>
			</WithTheme>
		);
	}
}

const mapStateToProps = state => ({
	userInfo: state.loggedInReducer.userInfo,

	gettingUserInfo: state.loggedInReducer.gettingUserInfo,
	gettingUserInfoError: state.loggedInReducer.gettingUserInfoError
});

export default withRouter(
	connect(
		mapStateToProps,
		{ loggedIn }
	)(App)
);
