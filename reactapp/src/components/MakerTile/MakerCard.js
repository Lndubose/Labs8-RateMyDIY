import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
// import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
// import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
// import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
// import IconButton from '@material-ui/core/IconButton';
// import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
// import FavoriteIcon from '@material-ui/icons/Favorite';
// import ShareIcon from '@material-ui/icons/Share';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import MoreVertIcon from '@material-ui/icons/MoreVert';
// import StarRatings from 'react-star-ratings';

const styles = theme => ({
	card: {
		width: 300,
		margin: '25px',
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

class MakerCard extends React.Component {
	state = { expanded: false };

	handleExpandClick = () => {
		this.setState(state => ({ expanded: !state.expanded }));
	};
	searchMaker = (e, username) => {
		e.preventDefault();
		console.log(username);
		this.props.fetchSearchResults(username);
	};
	render() {
		const { classes } = this.props;

		return (
			//To do: add info about maker to this card
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
							onClick={e => this.searchMaker(e, this.props.maker.username)}
							href={`/search?query=${this.props.maker.username}`}
						>
							{this.props.maker.username}
						</a>
					}
				/>
				<CardMedia className={classes.media} image={this.props.maker.img_url} />

				<CardActions className={classes.actions} disableActionSpacing />
			</Card>
		);
	}
}

MakerCard.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MakerCard);
