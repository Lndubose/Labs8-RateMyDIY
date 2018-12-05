import React from 'react';
import styled from "styled-components"
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Link } from 'react-router-dom';
import StarRatings from 'react-star-ratings';


const styles = theme => ({
  card: {
    width: '300px',
    margin: '25px',
    '&:hover' : {
      backgroundColor : '0'
    }
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
color:black

&:hover {
  text-decoration:none;
  color:black
}
`;



class ProjectCard extends React.Component {
  state = { expanded: false };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  render() {
    const { classes } = this.props;
    return (
      <CardLink className="project-card" href={`project/${this.props.project.user_id}`}>
        <Card style={{}} className={classes.card}>
          <CardHeader
            avatar={
              <Avatar aria-label="Rrecipe" className={classes.avatar}>
                {/* <img src={ this.props.userInfo.img_url ? this.props.userInfo.img_url : 'https://previews.123rf.com/images/alekseyvanin/alekseyvanin1801/alekseyvanin180100897/93405661-user-account-avatar-line-icon-outline-vector-sign-linear-style-pictogram-isolated-on-white-admin-pro.jpg'} alt="user profile pic" /> */}
              </Avatar>
            }
            action={null}
            title={this.props.project.project_name}
            subheader={this.props.project.username}
          />

          <CardMedia
            className={classes.media}
            image={this.props.project.img_url}
            title={this.props.project.project_name}
          />
          <CardContent>
            <StarRatings
              rating={Math.round(this.props.project.project_rating)}
              starRatedColor="yellow"
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
