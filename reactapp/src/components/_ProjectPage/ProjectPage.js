// Dependencies
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

// Components
import {
  Project,
  EditProject,
  Post,
  NewPost,
  EditPost,
  ReviewModal,
  ConfirmModal,
  Header
} from '../../components';

// Actions
import {
  loggedIn,
  project_ReviewId_Chain,
  deleteProject,
  fetchSearchResults
} from '../../actions';

// Styles
import styled from 'styled-components';

const ProjectPageHeaderContainer = styled.div`
  width: 100%;
`;

const ProjectPageContainer = styled.div`
  display: flex;
  justify-content: center;
  /* margin: 100px auto 0 auto; */
  margin: 100px auto;
  width: 100%;
`;

const ProjectContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 40%;
  max-width: 750px;
`;

const SideBarContainer = styled.div`
  display: flex;
  border: 1px solid green;
  margin: 0 0 0 5px;
  width: 10%;
  min-width: 150px;
  height: 500px;
  min-height: 500px;
`;

const StatusMessage = styled.p``;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
`;

const ProjectButton = styled.button``;

const ReviewButton = styled.button``;

class ProjectPage extends Component {
  state = {
	  input:''
	};

  // Delete project (with confirmation prompt)
  deleteHandler = event => {
    event.preventDefault();

    this.setState({
      confirm: {
        text: [
          'Are you sure? This cannot be undone.',
          'Cancel',
          'Delete Project'
        ],
        cancel: event => {
          event.preventDefault();
          this.setState({ confirm: undefined });
        },
        submit: event => {
          event.preventDefault();

          this.props.deleteProject(
            this.props.project.project_id,
            this.props.userInfo.user_id,
            () => this.setState({ redirect: '/' })
          );
          this.setState({ confirm: undefined });
        }
      }
    });
  };

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
  // Redirect to signup (this doesn't work yet)
  notLoggedInHandler = () => {
    this.setState({
      confirm: {
        text: [
          `You aren't logged in! todo: add a redirect to signup`,
          'Cancel',
          'Cancel'
        ],
        cancel: event => {
          event.preventDefault();
          this.setState({ confirm: undefined });
        },
        submit: event => {
          event.preventDefault();
          this.setState({ confirm: undefined });
        }
      }
    });
  };

  componentDidMount() {
    this.props.loggedIn(
      project_ReviewId_Chain,
      this.props.match.params.project_id
    );
  }

  render() {
    // Evaluates to true if user is author of project
    const owner = this.props.project.user_id === this.props.userInfo.user_id;

    // Disable other buttons if there is an active form
    const disabled =
      this.state.gettingProject ||
      this.props.updatingProject ||
      this.state.projectToUpdate ||
      this.state.postToAdd ||
      this.state.postToUpdate ||
      this.state.postToDelete;

    return (
      <ProjectPageHeaderContainer>
        {this.state.redirect && <Redirect push to={this.state.redirect} />}
        <Header
          handleChange={this.handleChange}
          handleSearch={this.handleSearch}
        />
        <ProjectPageContainer>
          <ProjectContainer>
            {/* Might be a good idea to replace these with a switch */}
            {this.state.projectToUpdate ? (
              <EditProject
                user_id={this.props.userInfo.user_id}
                project={this.props.project}
                willUpdateProject={value =>
                  this.setState({ projectToUpdate: value })
                }
              />
            ) : this.props.gettingUserInfo ||
              (this.props.gettingProject &&
                this.props.project.project_id !=
                  this.props.match.params.project_id) ||
              this.props.gettingReviewId ? (
              <React.Fragment>
                <StatusMessage>Loading project...</StatusMessage>
              </React.Fragment>
            ) : this.props.gettingProjectError ? (
              <React.Fragment>
                <StatusMessage>Failed to load project</StatusMessage>
                <StatusMessage error>
                  {this.props.gettingProjectError}
                </StatusMessage>
              </React.Fragment>
            ) : this.props.deletingProjectError ? (
              <React.Fragment>
                <StatusMessage>Failed to delete project</StatusMessage>
                <StatusMessage error>
                  {this.props.gettingProjectError}
                </StatusMessage>
              </React.Fragment>
            ) : (
              <Project
                project={this.props.project}
                owner={owner}
                willUpdateProject={value =>
                  this.setState({ projectToUpdate: value })
                }
                deleteHandler={this.deleteHandler}
                disabled={disabled}
              />
            )}

            {/* Display posts */}
            {this.props.project.posts &&
              !this.props.gettingReviewId &&
              this.props.project.posts.map(post =>
                // Could probably move this logic to Post
                post.post_id === this.state.postToUpdate ? (
                  <EditPost
                    key={post.post_id}
                    user_id={this.props.userInfo.user_id}
                    project_id={this.props.project.project_id}
                    post={post}
                    willUpdatePost={value =>
                      this.setState({ postToUpdate: value })
                    }
                  />
                ) : (
                  <Post
                    key={post.post_id}
                    post={post}
                    user_id={this.props.userInfo.user_id}
                    project_id={this.props.project.project_id}
                    owner={owner}
                    willUpdatePost={value =>
                      this.setState({ postToUpdate: value })
                    }
                    willDeletePost={value =>
                      this.setState({ postToDelete: value })
                    }
                    postToDelete={post.post_id === this.state.postToDelete}
                    disabled={disabled}
                  />
                )
              )}

            {/* Add new post */}
            {this.state.postToAdd && (
              <NewPost
                postType={this.state.postToAdd}
                user_id={this.props.userInfo.user_id}
                project_id={this.props.project.project_id}
                willAddPost={value => this.setState({ postToAdd: value })}
              />
            )}

            {/* Bottom buttons */}
            {this.props.project.project_id ==
              this.props.match.params.project_id &&
              !this.props.gettingReviewId &&
              !this.props.gettingProjectError &&
              !this.state.postToAdd &&
              (owner ? (
                <ButtonContainer>
                  <ProjectButton
                    onClick={() => this.setState({ postToAdd: 'text' })}
                    disabled={disabled}
                  >
                    Add Text Field
                  </ProjectButton>
                  <ProjectButton
                    onClick={() => this.setState({ postToAdd: 'image' })}
                    disabled={disabled}
                  >
                    Add Picture
                  </ProjectButton>
                </ButtonContainer>
              ) : this.props.reviewId ? (
                <ReviewButton
                  onClick={() =>
                    this.setState({ reviewModal: this.props.reviewId })
                  }
                  disabled={this.props.gettingReviewId}
                >
                  View Your Review
                </ReviewButton>
              ) : (
                <ReviewButton
                  onClick={() =>
                    this.props.userInfo.user_id
                      ? this.setState({ reviewModal: 'new' })
                      : this.notLoggedInHandler()
                  }
                  disabled={this.props.gettingReviewId}
                >
                  Review Project
                </ReviewButton>
              ))}

            {this.state.reviewModal && (
              <ReviewModal
                review_id={this.state.reviewModal}
                closeModal={this.setState({ reviewModal: null })}
              />
            )}

            {this.state.confirm && (
              <ConfirmModal confirm={this.state.confirm} />
            )}
            {this.props.deletingProject && (
              <ConfirmModal statusMessage={'Deleting project...'} />
            )}
          </ProjectContainer>
          <SideBarContainer />
        </ProjectPageContainer>
      </ProjectPageHeaderContainer>
    );
  }
}

const mapStateToProps = state => {
  return {
    userInfo: state.loggedInReducer.userInfo,

    gettingUserInfo: state.loggedInReducer.gettingUserInfo,
    gettingUserInfoError: state.loggedInReducer.gettingUserInfoError,

    project: state.projectReducer.project,

    gettingProject: state.projectReducer.gettingProject,
    gettingProjectError: state.projectReducer.gettingProjectError,

    reviewId: state.reviewReducer.reviewId,

    gettingReviewId: state.reviewReducer.gettingReviewId,
    gettingReviewIdError: state.reviewReducer.gettingReviewIdError,

    deletingProject: state.projectReducer.deletingProject,
    deletingProjectError: state.projectReducer.deletingProjectError
  };
};

export default connect(
  mapStateToProps,
  {
    loggedIn,
    project_ReviewId_Chain,
    deleteProject,
    fetchSearchResults
  }
)(ProjectPage);
