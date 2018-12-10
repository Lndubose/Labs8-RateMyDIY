import React from 'react';
// import { Link } from "react-router-dom";
import styled from 'styled-components';

//Apply styles
// const SearchWrapper = styled.div`
// 	width: 80%;
// 	height: 0px;
// 	margin: 0 auto;
// 	display: flex;
// 	flex-direction: column;

// 	@media (max-width: 500px) {
// 		width: 100%;
// 	}
// `;

// const SelectWrapper = styled.div`
// 	display: flex;
// 	justify-content: space-around;
// `;

// const SelectStyle = styled.select`
// 	height: 24px;
// 	width: 20%;
// 	transform: 1s;
// 	/* border-radius: 5px; */

// 	@media (max-width: 500px) {
// 		text-align-last: center;
// 		padding-left: 10px;
// 	}
// `;

const SearchBarWrapper = styled.form`
	display: flex;
	width: 70%;
	height: 35px;
	//align-items: baseline;

	@media (max-width: 500px) {
		width: 85%;
		position: relative;
	}
`;
// const SearchBarSearchButtonWrapper = styled.div`
// 	@media (max-width: 500px) {
// 		position: relative;
// 	}
// `;
const SearchBarInput = styled.input`
	width: 100%;
	height: 45px;
	//color: #a6aaad;
	outline: none;
	border: 2px solid black;
	border-right: 0;
	font-size: 14px;

	font-size: 14px;
`;

const SearchBarButton = styled.button`
	position: relative;
	right: 0;
	width: 11%;
	height: 45px;
	border: 2px solid black;
	border-left: 0;
	background-color: white;

	@media (max-width: 500px) {
		text-align: right;
		box-shadow: none;
		z-index: 1;
		width: 20%;
	}
`;

const SearchBar = props => {
	return (
		// <SearchWrapper>
		// 	<SelectWrapper />
		// 	<SearchBarSearchButtonWrapper>
		// 	</SearchBarSearchButtonWrapper>
		// </SearchWrapper>

		<SearchBarWrapper>
			<SearchBarInput
				onChange={e => props.handleChange(e)}
				placeholder="Find a DIY project or Author"
			/>
			<SearchBarButton
				onClick={e => props.handleSearch(e)}
				className="search-button"
			>
				<img
					src="https://cdn4.iconfinder.com/data/icons/kripto-black-2/512/kripto-search-b.png"
					alt="Search icon"
					style={{ width: '20px', height: '20px' }}
				/>
			</SearchBarButton>
		</SearchBarWrapper>
	);
};

export default SearchBar;
