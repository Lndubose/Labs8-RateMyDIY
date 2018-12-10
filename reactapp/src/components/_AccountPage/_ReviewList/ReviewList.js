import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchMyReviews, fetchSearchResults, loggedIn } from '../../../actions';
import { AccountSideBar } from '../../../components';
import { Header } from '../../../components';
import './ReviewList.css';
// import styled from 'styled-components';
import { ReviewRender } from '../../../components';
// const CardLink = styled.a`
//   text-decoration: none;
//   color:black &:hover {
//     text-decoration: none;
//     color: black;
//   }
// `;

class ReviewList extends Component {
	constructor() {
		super();
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
		this.props.loggedIn(fetchMyReviews);
	}

	render() {
		if (!this.props.myReviews || this.props.myReviews.length === 0) {
			return (
				<div>
					<Header
						handleChange={this.handleChange}
						handleSearch={this.handleSearch}
					/>
					<div className="reviewPage">
						<div className="sideBar">
							<AccountSideBar />
						</div>
						<div className="addNewReview">
							<h2>Add a new review</h2>
							<Link to="">
								<img
									alt="PLACEHOLDER! alt text"
									src="http://chittagongit.com//images/plus-button-icon/plus-button-icon-13.jpg"
								/>
							</Link>
						</div>
					</div>
				</div>
			);
		} else {
			return (
				<div>
					<Header
						handleChange={this.handleChange}
						handleSearch={this.handleSearch}
					/>

					<div className="reviewPage">
						<AccountSideBar />

						<div className="myReviewDisplay">
							{this.props.myReviews.map(myReviews => (
								<ReviewRender
									key={myReviews.review_id}
									myReview_id={myReviews.review_id}
									myReviewsText={myReviews.text}
									myReviewsImg_url={myReviews.img_url}
									myReviewsRating={myReviews.rating}
								/>
							))}
						</div>
					</div>
				</div>
			);
		}
	}
}

const mapStateToProps = state => {
	return {
		myReviews: state.myProjectReducer.myReviews,
		userInfo: state.loggedInReducer.userInfo
	};
};

export default connect(
	mapStateToProps,
	{ fetchMyReviews, fetchSearchResults, loggedIn }
)(ReviewList);
