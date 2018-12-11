import axios from 'axios';
import { loggedIn } from '../actions';
axios.defaults.withCredentials = true;

// get userInfo
export const GETTING_USERNAME = 'GETTING_USERNAME';
export const GOT_USERNAME = 'GOT_USERNAME';
export const GET_USERNAME_ERROR = 'GET_USERNAME_ERROR';
export const GETTING_PROFILE_PIC = 'GETTING_PROFILE_PIC';
export const GOT_PROFILE_PIC = 'GOT_PROFILE_PIC';
export const GET_PROFILE_PIC_ERROR = 'GET_PROFILE_PIC_ERROR';
export const GETTING_THUMBNAIL = 'GETTING_THUMBNAIL';
export const GOT_THUMBNAIL = 'GOT_THUMBNAIL';
export const GET_THUMBNAIL_ERROR = 'GET_THUMBNAIL_ERROR';

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

export const getUsername = (username) => {
	return dispatch => {
		dispatch({ type: GETTING_USERNAME });

		axios
			.post(
				(process.env.REACT_APP_BACKEND || `http://localhost:5000`) + `/api/users/editusername`, { username: username }
			)

			.then(({data}) => {
				console.log('success', data);
				if (data.message === username) {
					dispatch({ type: GOT_USERNAME, payload: data.message });
				} else {
					dispatch({ type: GET_USERNAME_ERROR, payload: data.message })
				}
			})

			.then(() => dispatch(loggedIn()))

            .catch(error => {
                console.log('error', error);
                dispatch({ type: GET_USERNAME_ERROR, payload: error.message })
            });
	};
};

export const getProfilePic = (img_url) => {
	return dispatch => {
		dispatch({ type: GETTING_PROFILE_PIC });

		axios
			.post(
				(process.env.REACT_APP_BACKEND || `http://localhost:5000`) + `/api/users/editprofilepic`, { img_url: img_url }
			)

			.then(async ({data}) => {
				await sleep(3000);
				dispatch({ type: GOT_PROFILE_PIC, payload: data.message });
			})

			.then(() => dispatch(loggedIn()))

            .catch(error => {
                console.log('error', error);
                dispatch({ type: GET_PROFILE_PIC_ERROR, payload: error.message });
            });
	}
}

export const getThumbnail = ({img_url}, size) => {
	return dispatch => {
		dispatch({ type: GETTING_THUMBNAIL });

		axios
			.post(
				(process.env.REACT_APP_BACKEND || `http://localhost:5000`) + `/api/projects/image-download`, { prefix: `${size}/${img_url.match(/[^/]*$/)[0].split('?')[0]}` }
				
			)

			.then(({data}) => {
				dispatch({ type: GOT_THUMBNAIL, payload: {data, size} });
			})

            .catch(error => {
                console.log('thumbnail error', error);
                dispatch({ type: GET_THUMBNAIL_ERROR, payload: error });
            });
	}
}
