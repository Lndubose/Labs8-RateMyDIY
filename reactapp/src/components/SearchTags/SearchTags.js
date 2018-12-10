import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
	width: 100%;
	display: flex;
	margin: 25px;
	margin-left: 33%;
`;

const SuggestedCategories = styled.a`
	font-size: 14px;
	color: white;
	margin: 0 3px;

	&:hover {
		background-color: transparent;
		color: white;
		text-decoration: underline;
	}
`;

const SearchTags = props => {
	return (
		<Container>
			<span>Suggested:</span>{' '}
			{props.tags.map((tag, index) => (
				<SuggestedCategories href={`/search?query=${tag}`} key={tag}>
					{tag}
					{props.tags.length > index + 1 ? ', ' : ''}
				</SuggestedCategories>
			))}
		</Container>
	);
};

export default SearchTags;
