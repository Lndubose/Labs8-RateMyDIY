const db = require('../config/dbConfig');

module.exports = {
	getPopularProjects,
	getPopularMakers,
	getPopularReviewers
};

function getPopularProjects() {
	return (
		db('projects')
			.join('users', 'projects.user_id', 'users.user_id')
			.select(
				'projects.img_url',
				'projects.user_id',
				'projects.project_name',
				'users.username',
				'users.img_url as maker_photo_url',
				'projects.project_id',
				'projects.project_rating',
				'projects.text'
			)
			// For Azure
			// .orderBy('project_rating', 'desc')
			// For Heroku
			.orderByRaw('project_rating DESC NULLS LAST')
			.limit(4)
	);
}

function getPopularMakers() {
	return (
		db('users')
			// For Azure
			// .orderBy('user_rating', 'desc')
			// For Heroku
			.orderByRaw('user_rating DESC NULLS LAST')
			.limit(4)
	);
}

function getPopularReviewers() {
	return (
		db('users')
			// For Azure
			// .orderBy('helpfulness', 'desc')
			// For Heroku
			.orderByRaw('helpfulness DESC NULLS LAST')
			.limit(4)
	);
}
