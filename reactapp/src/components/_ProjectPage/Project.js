// Dependencies
import React from 'react';
import ModalImage from 'react-modal-image';
// import { Button } from 'reactstrap';
// Components
// import StarRatings from 'react-star-ratings';

import { Link } from 'react-router-dom';

// Styles
import styled from 'styled-components';

const ProjectWrapper = styled.div`
	margin: 0 0 24px 0;
`;

const ProjectContainer = styled.div`
	display: flex;
	flex-direction: column;
	background: #e9ded8;
	width: 100%;
	padding: 0 0 8px 0;
	box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
`;

const ProjectHeader = styled.div`
	display: flex;
	position: 50%;
	flex-direction: column;
	background: #e9ded8;
	padding: 24px 24px 8px 24px;
`;

const ProjectName = styled.h2`
	display: flex;
	font-size: 32px;
	font-weight: bold;
`;

const ProjectAuthor = styled.div`
	margin: 0 0 0 2px;
`;

const CategoryContainer = styled.div`
	font-size: 1.6rem;
	margin: 12px 0 0;
	display: flex;
`;

const Category = styled(Link)`
	min-width: 54px;
	margin: 0 4px 0 0;
	text-align: center;
	letter-spacing: 0.05rem;
	color: white;
	background: #254f8d;
	padding: 4px 5px 2px;
	border-radius: 4px;

	&:hover {
		text-decoration: none;
		color: white;
		background: #1c293b;
	}
`;

const Img = styled(ModalImage)`
	margin: 0 auto;
	background: white;
	width: auto;
	height: auto;
`;

const ImgContainer = styled.div`
	margin: auto;
	max-width: 700px;
	height: auto;
`;

const Text = styled.p`
	width: auto;
	padding: 16px 16px 8px 16px;
	font-size: 16px;
`;

const OptionsContainer = styled.div`
	display: flex;
	margin: 8px 0 0 auto;
	font-size: 11px;
	color: rgb(42, 43, 45);
`;

// const ReviewsLink = styled.button`
// 	background: none;
// 	border: none;
// 	outline: none;
// 	cursor: pointer;
// 	padding: 0;
// 	margin-right: 8px;
// `;

const EditLink = styled.button`
	background: none;
	border: none;
	outline: none;
	cursor: pointer;
	padding: 0;
	margin-right: 8px;
`;

const DeleteButton = styled.button`
	background: none;
	border: none;
	outline: none;
	cursor: pointer;
	padding: 0;
`;

const ReviewsLink = styled(Link)`
	position: relative;
	width: 200px;
	top: -10px;
	left: 55%;

	&:hover {
		text-decoration: none;
		background: none;
	}
`;

const Project = props => {
	return (
		<ProjectWrapper>
			<ProjectContainer>
				<ProjectHeader>
					<ReviewsLink to={`/project/${props.project.project_id}/reviews`}>
						Super Temporary Reviews Link
					</ReviewsLink>

					<ProjectName>{props.project.project_name}</ProjectName>

					<ProjectAuthor>by user ID {props.project.user_id}</ProjectAuthor>
					{/* {props.project.project_rating ?
						<StarRatings
							rating={props.project.project_rating}
							starRatedColor="black"
							starEmptyColor="grey"
							// changeRating={this.changeRating}
							starDimension="20px"
							starSpacing="5px"
							numberOfStars={5}
						/> : null} */}

					<CategoryContainer>
						{props.project.categories &&
							// [
							// 	{ category_id: 1, category_name: 'Tech' },
							// 	{ category_id: 2, category_name: 'Home' },
							// 	{ category_id: 3, category_name: 'Cooking' }
							// ].map(({ category_id, category_name }) => (
							props.project.categories.map(({ category_id, category_name }) => (
								// Needs category search!
								<Category
									to={`/make/search/queries/for/categories/please/${category_id}`}
									key={category_id}
								>
									{category_name}
								</Category>
							))}
					</CategoryContainer>
				</ProjectHeader>

				<ImgContainer>
					<Img
						small={props.project.img_url}
						large={props.project.img_url}
						alt={props.project.project_name}
						src={props.project.img_url}
					/>
				</ImgContainer>

				<Text>{props.project.text}</Text>

				{props.owner && (
					<OptionsContainer>
						{/* <ReviewsLink disabled={props.disabled}>reviews</ReviewsLink> */}
						<EditLink
							onClick={() => props.willUpdateProject(true)}
							disabled={props.disabled}
						>
							edit
						</EditLink>
						<DeleteButton
							color="danger"
							onClick={props.deleteHandler}
							disabled={props.disabled}
						>
							delete
						</DeleteButton>
					</OptionsContainer>
				)}
			</ProjectContainer>
		</ProjectWrapper>
	);
};

export default Project;
