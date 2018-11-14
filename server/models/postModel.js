const db = require('../config/dbConfig');

module.exports = {
	addPost,
	editPost,
	removePost
};

function addPost(user_id, project_id, post) {
	return db('projects')
		.where({ user_id, project_id })
		.first()
		.then(project => {
			if (project) {
				return db('posts')
					.returning('post_id')
					.insert({ ...post, project_id })
					.then(([id]) => id);
			} else return undefined;
		});
}

function editPost(user_id, project_id, post_id, changes) {
	return db('projects')
		.where({ user_id, project_id })
		.first()
		.then(post => {
			if (post) {
				return db('posts')
					.where({ post_id, project_id })
					.returning('post_id')
					.update(changes)
					.then(ids => ids.length);
			} else return undefined;
		});
}

function removePost(user_id, project_id, post_id) {
	return db('projects')
		.where({ user_id, project_id })
		.first()
		.then(post => {
			if (post) {
				return db('posts')
					.where({ post_id })
					.del();
			} else return undefined;
		});
}
