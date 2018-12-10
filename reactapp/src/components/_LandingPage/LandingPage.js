// Import Dependencies
import React, { Component } from 'react';
// import { NavLink, Link, Route } from "react-router-dom";
import styled from 'styled-components';
//Added Redux imports
import {
	fetchSearchResults,
	fetchProjectsByReviewer
} from '../../actions/index';
import { connect } from 'react-redux';
import MenuDrawer from '../MenuDrawer/MenuDrawer';

// ReactStrap
// import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

//Import components
import {
	Nav,
	FeaturedProjects,
	PopularMakers,
	PopularReviewers,
	SearchBar,
	// Twillio,
	Footer,
	LogInPopUp,
	SearchTags
} from '../../components';

// styled-components
const LandingPageContentWrapper = styled.div`
	display: flex;
	flex-direction: column;
	margin: 5% auto;
	width: 80%;
	background-color: ${props => props.theme.mui.palette.primary.main};
`;
const LandingPageWrapper = styled.div`
	width: 100%;
	background-color: ${props => props.theme.mui.palette.primary.main};

	@media (max-width: 500px) {
		width: 100vw;
	}
`;

const imgUrl =
	'http://talebgroup.wwwnlssr4.supercp.com/wp-content/uploads/2018/01/carpentary-3-1-1024x648.jpg';

const HeroImageContainer = styled.div`
	width: 100%;
	height: 560px;
	background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
		url(${imgUrl});
	background-size: cover;
	background-repeat: no-repeat;
	background-position: bottom;
`;

const HeroSearchContainer = styled.div`
	width: 60%;
	position: absolute;
	top: 30%;
	left: 50%;
	transform: translate(-50%, -50%);
	color: white;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const HeroTitle = styled.h1`
	text-align: center;
	font-weight: bolder;
	color: white;
	font-size: 32px;
	margin-bottom: 30px;
`;
class LandingPage extends Component {
	constructor() {
		super();
		this.state = { input: '', modal: false, toggleLogInPopUp: false };
		this.toggle = this.toggle.bind(this);
	}

	componentDidMount() {}

	toggle() {
		this.setState({
			modal: !this.state.modal
		});
	}

	handleChange = e => {
		console.log(e.target.value);
		this.setState({ ...this.state, input: e.target.value });
	};

	handleSearch = e => {
		const searchTerm = this.state.input;
		e.preventDefault();
		//if not signed in,
		if (!this.props.loggedInObject.userInfo.user_id) {
			//this.toggle();
			//toggle loginpopup on
			this.setState({
				...this.state,
				toggleLogInPopUp: !this.state.toggleLogInPopUp
			});
		} else {
			//call featch search results action
			// this.props.fetchSearchResults(this.state.input);

			//push to search page
			this.props.history.push(`/search?query=${searchTerm}`);
		}
	};

	searchWithoutLogin = () => {
		//call featch search results action
		const searchTerm = this.state.input;
		this.props.fetchSearchResults(this.state.input);

		//push to search page
		this.props.history.push(`/search?query=${searchTerm}`);
	};

	searchClick = input => {
		//call featch search results action
		this.props.fetchSearchResults(input);

		//push to search page
		this.props.history.push(`/search?query=${input}`);
	};

	getProjectsByReviewer = username => {
		console.log('search for this reviewer : ' + username);
		this.props.fetchProjectsByReviewer(username);

		//push to search page
		this.props.history.push(`/search?user=${username}`);
	};

	render() {
		return (
			<LandingPageWrapper>
				<HeroImageContainer>
					{window.innerWidth <= 500 ? <MenuDrawer /> : <Nav />}
					<HeroSearchContainer>
						<HeroTitle>Find a project to build or review</HeroTitle>
						<SearchBar
							handleChange={this.handleChange}
							handleSearch={this.handleSearch}
						/>
						<SearchTags tags={['carpentry', 'home', 'garden', 'tech']} />
					</HeroSearchContainer>
				</HeroImageContainer>
				<LandingPageContentWrapper>
					{this.state.toggleLogInPopUp ? (
						<LogInPopUp
							searchWithoutLogin={this.searchWithoutLogin}
							toggleLogInPopUp={this.state.toggleLogInPopUp}
						/>
					) : (
						//  'hey please log in'
						''
					)}
					<FeaturedProjects />
					<PopularMakers fetchSearchResults={this.searchClick} />
					<PopularReviewers
						getProjectsByReviewer={this.getProjectsByReviewer}
					/>
					<Footer />
				</LandingPageContentWrapper>
			</LandingPageWrapper>
		);
	}
}

const mapStateToProps = state => ({
	projects: state.searchReducer.projects,
	loggedInObject: state.loggedInReducer
});

export default connect(
	mapStateToProps,
	{ fetchSearchResults, fetchProjectsByReviewer }
)(LandingPage);
