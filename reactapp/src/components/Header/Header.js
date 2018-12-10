import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { SearchBar, Nav } from '../index';

const HeaderContainer = styled.div`
	width: 100%;
	height: 76px;
	z-index: 999;
	position: fixed;
	background-color: #232a34;
`;

const HeaderContainerWraper = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const HeaderSearchContainer = styled.div`
	width: 50%;
	margin: 0 20px;
`;

const Logo = styled.img`
	cursor: pointer;
`;

const Header = props => {
	return (
		<HeaderContainer>
			<HeaderContainerWraper>
				<Link to="/">
					<Logo
						style={{ width: '60px', height: '60px', margin: '0 20px' }}
						src="https://ratemydiy.s3.amazonaws.com/1543872216210"
						alt="LOGO"
					/>
				</Link>

				<HeaderSearchContainer>
					<SearchBar
						handleChange={props.handleChange}
						handleSearch={props.handleSearch}
					/>
				</HeaderSearchContainer>
				<Nav />
			</HeaderContainerWraper>
		</HeaderContainer>
	);
};

export default Header;
