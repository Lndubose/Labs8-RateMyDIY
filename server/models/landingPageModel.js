const db = require('../config/dbConfig');

module.exports = {
  getPopularProjects,
  getPopularMakers,
  getPopularReviewers
};

function getPopularProjects() {
  return db('projects')
    .join("users", "projects.user_id", "users.user_id")
    .select("projects.img_url",
      "projects.user_id",
      "projects.project_name",
      "users.username",
      "projects.project_id",
      "projects.project_rating")
    .orderBy('project_rating', 'desc')
    .limit(4)
}

function getPopularMakers() {
  return db('users')
    .orderBy('user_rating', 'desc')
    .limit(4)
}

function getPopularReviewers() {
  return db('users')
    .orderBy('helpfulness', 'desc')
    .limit(4)
}