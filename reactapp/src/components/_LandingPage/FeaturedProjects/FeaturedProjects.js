// Import Dependencies
import React, { Component } from 'react';
import styled from 'styled-components';
//Import components
import { ProjectTile } from '../../../components';
// import connect for reducers
import { connect } from 'react-redux';
import { getFeaturedProjects } from '../../../actions/landingPageActions';

// styled components
const FeaturedProjectsWrapper = styled.div`
	display: flex;
	flex-direction: column;
	border-radius: 30px;
	background-color: ${props => props.theme.mui.palette.primary.light}
	margin: 3% 0%;

	@media (max-width: 500px) {
		width: 100%;
	}
`;

const FeaturedProjectListTiles = styled.div`
	display: flex;
	flex-wrap: wrap;
	align-content: space-between;

	@media (max-width: 500px) {
		width: 100%;
		align-self: center;
	}
`;

const FeaturedProjectTitle = styled.h1`
	font-size: 18px;
	width: 100%;
	margin: 25px 50px 0px 50px;
	color: ${props => props.theme.mui.palette.primary.dark} @media
		(max-width: 500px) {
		width: 80%;
		margin: 15px auto;
		text-align: center;
		font-weight: bold;
	}
`;

class FeaturedProjects extends Component {
	componentDidMount() {
		this.props.getFeaturedProjects();
	}

	render() {
		return (
			<FeaturedProjectsWrapper>
				<FeaturedProjectTitle>Featured Projects</FeaturedProjectTitle>
				<FeaturedProjectListTiles>
					{this.props.featuredProjects.map(project => (
						<ProjectTile
							history={this.props.history}
							project={project}
							key={project.project_id}
						/>
					))}
				</FeaturedProjectListTiles>
			</FeaturedProjectsWrapper>
		);
	}
}

const mapStateToProps = state => ({
	featuredProjects: state.landingPageReducer.featuredProjects,
	gettingFeaturedProjects: state.landingPageReducer.fetchingFeaturedProjects,
	featuredProjectsError: state.landingPageReducer.featuredProjectsError
});

export default connect(
	mapStateToProps,
	{ getFeaturedProjects }
)(FeaturedProjects);
