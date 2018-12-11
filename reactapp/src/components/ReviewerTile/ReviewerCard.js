import red from '@material-ui/core/colors/red';
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
// import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
// import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';

const styles = theme => ({
	card: {
		width: 300,
		margin: '25px',
		fontSize: 24,
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

class ReviewerCard extends React.Component {
	state = { expanded: false };

	handleExpandClick = () => {
		this.setState(state => ({ expanded: !state.expanded }));
	};

	searchReviewer = (e, username) => {
		e.preventDefault();
		console.log(username);
		this.props.getProjectsByReviewer(username);
	};

	render() {
		const { classes } = this.props;

		return (
			<Card className={classes.card}>
				<CardHeader
					avatar={
						<Avatar aria-label="Rrecipe" className={classes.avatar}>
							{/* <img src={ this.props.userInfo.img_url ? this.props.userInfo.img_url : 'https://previews.123rf.com/images/alekseyvanin/alekseyvanin1801/alekseyvanin180100897/93405661-user-account-avatar-line-icon-outline-vector-sign-linear-style-pictogram-isolated-on-white-admin-pro.jpg'} alt="user profile pic" /> */}
						</Avatar>
					}
					action={null}
					title={
						<a
							style={{ fontSize: '2rem', background: 'none' }}
							onClick={e =>
								this.searchReviewer(e, this.props.reviewer.username)
							}
							href={`/search?query=${this.props.reviewer.username}`}
						>
							{this.props.reviewer.username}
						</a>
					}
				/>
				<CardMedia
					className={classes.media}
					image={this.props.reviewer.img_url}
				/>

				<CardActions className={classes.actions} disableActionSpacing />
			</Card>
		);
	}
}

ReviewerCard.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ReviewerCard);
