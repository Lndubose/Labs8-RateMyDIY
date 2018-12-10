import React from 'react';
// import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';

const logoutURL =
	(process.env.REACT_APP_BACKEND || `http://localhost:5000`) + `/signout`;

const styles = theme => ({
	root: {
		display: 'flex'
	},
	profilepic: {
		width: '40px',
		height: '40px',
		borderRadius: '50%'
	}
});

class DropDown extends React.Component {
	state = {
		open: false
	};

	handleToggle = () => {
		this.setState(state => ({ open: !state.open }));
	};

	handleClose = event => {
		if (this.anchorEl.contains(event.target)) {
			return;
		}

		this.setState({ open: false });
	};

	render() {
		const { classes } = this.props;
		const { open } = this.state;

		return (
			<div className={classes.root}>
				<Button
					buttonRef={node => {
						this.anchorEl = node;
					}}
					aria-owns={open ? 'menu-list-grow' : undefined}
					aria-haspopup="true"
					onClick={this.handleToggle}
					style={{ outline: 'none' }}
				>
					<img
						src={this.props.userInfo.img_url}
						className={classes.profilepic}
						alt={this.props.userInfo.username}
					/>
				</Button>
				<Popper open={open} anchorEl={this.anchorEl} transition disablePortal>
					{({ TransitionProps, placement }) => (
						<Grow
							{...TransitionProps}
							id="menu-list-grow"
							style={{
								transformOrigin:
									placement === 'bottom' ? 'center top' : 'center bottom'
							}}
						>
							<Paper>
								<ClickAwayListener onClickAway={this.handleClose}>
									<MenuList>
										<MenuItem onClick={this.handleClose}>
											<Link to={`/ProjectList`}>My Profile</Link>
										</MenuItem>
										<MenuItem onClick={this.handleClose}>
											<Link to={`/settings`}>Profile Settings</Link>
										</MenuItem>
										<MenuItem onClick={this.handleClose}>
											<Link to={`/newproject`}>New Project</Link>
										</MenuItem>
										<MenuItem onClick={this.handleClose}>
											<a href={logoutURL}>Signout</a>
										</MenuItem>
									</MenuList>
								</ClickAwayListener>
							</Paper>
						</Grow>
					)}
				</Popper>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	userInfo: state.loggedInReducer.userInfo
});

export default compose(
	withStyles(styles),
	connect(mapStateToProps)
)(DropDown);
