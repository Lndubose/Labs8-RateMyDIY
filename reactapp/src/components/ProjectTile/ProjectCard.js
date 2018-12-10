import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import StarRatings from 'react-star-ratings';

const styles = theme => ({
	card: {
		width: '300px',
		margin: '25px',
		marginBottom: '30px',
		'&:hover': {
			backgroundColor: '0'
		},
		backgroundColor: theme.palette.secondary.light,
		borderRadius: '35px',
		color: theme.palette.secondary.main
	},
	media: {
		height: 0,
		paddingTop: '56.25%' // 16:9
	},
	actions: {
		display: 'flex'
	},
	avatar: {
		backgroundColor: red[500]
	}
});

const CardLink = styled.a`
	text-decoration: none;
	color:black &:hover {
		text-decoration: none;
		color: black;
	}
`;

class ProjectCard extends React.Component {
	state = { expanded: false };

	handleExpandClick = () => {
		this.setState(state => ({ expanded: !state.expanded }));
	};

	render() {
		const { classes, theme } = this.props;
		console.log(this.props.project);
		console.log('THEME', theme);
		return (
			<CardLink
				className="project-card"
				href={`project/${this.props.project.project_id}`}
			>
				<Card style={{}} className={classes.card}>
					<CardHeader
						avatar={
							<Avatar
								src={this.props.project.maker_photo_url}
								className={classes.avatar}
							/>
						}
						action={null}
						title={this.props.project.project_name}
						subheader={<div>{this.props.project.username} </div>}
					/>

					<CardMedia
						className={classes.media}
						image={this.props.project.img_url}
						title={this.props.project.project_name}
					/>
					<CardContent>
						<StarRatings
							rating={Math.round(this.props.project.project_rating)}
							// starRatedColor="yellow"
							starDimension="14px"
							starSpacing="4px"
							starRatedColor="black"
						/>
					</CardContent>
					<CardContent>
						<Typography component="p">
							[THIS IS THE PROJECT DESCRIPTION]
						</Typography>
					</CardContent>
					<CardActions className={classes.actions} disableActionSpacing />
				</Card>
			</CardLink>
		);
	}
}

ProjectCard.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ProjectCard);
