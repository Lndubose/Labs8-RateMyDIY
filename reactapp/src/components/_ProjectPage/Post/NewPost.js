// Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

// Components
import { ConfirmModal } from '../../../components';

// Actions
import { addPost } from '../../../actions';

// Styles
import styled from 'styled-components';

const PostContainer = styled.div`
	background: #ffcccc;
`;
const Img = styled.img`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 380px;
	width: 100%;
	background: #cceeee;
	margin-bottom: 20px;
`;

const PostForm = styled.form``;

const TextInput = styled.input``;

const CancelButton = styled.button``;

const SubmitInput = styled.input``;

const PostButtonContainer = styled.div`
	display: flex;
	justify-content: flex-end;
	margin-top: -12px;
	margin-bottom: 20px;
`;

const StatusMessage = styled.p``;

class NewPost extends Component {
	state = {
		img_url: null,
		text: ''
	};

	singleFileChangedHandler = event => {
		this.setState({
			selectedFile: event.target.files[0]
		});
	};

	singleFileUploadHandler = event => {
		event.preventDefault();
		const data = new FormData();
		// If file selected
		if (this.state.selectedFile) {
			data.append(
				'image',
				this.state.selectedFile,
				this.state.selectedFile.name
			);
			axios
				.post(
					(process.env.REACT_APP_BACKEND || 'http://localhost:5000') +
						`/api/projects/image-upload`,
					data,
					{
						headers: {
							accept: 'application/json',
							'Accept-Language': 'en-US,en;q=0.8',
							'Content-Type': `multipart/form-data; boundary=${data._boundary}`
						}
					}
				)
				.then(response => {
					if (200 === response.status) {
						// If file size is larger than expected.
						if (response.data.error) {
							if ('LIMIT_FILE_SIZE' === response.data.error.code) {
								// this.ocShowAlert("Max size: 2MB", "red");
							} else {
								console.log(response.data.location);
								// If not the given file type
								// this.ocShowAlert(response.data.error, "red");
							}
						} else {
							// Success
							let fileName = response.data;

							let photo = response.data.location;
							this.setState({
								img_url: photo
							});
							console.log('filedata', fileName);

							console.log('photo', photo);

							//   this.ocShowAlert("File Uploaded", "#3089cf");
						}
					} else {
						console.log('error');
					}
				})
				.catch(error => {
					// If another error
					console.log('error');
				});
		}
	};

	// Keep form data in the state
	changeHandler = event => {
		this.setState({ [event.target.name]: event.target.value });
	};

	// Submit new post
	submitHandler = event => {
		event.preventDefault();

		this.props.addPost(
			{
				user_id: this.props.user_id,
				project_id: this.props.project_id,
				img_url: this.state.img_url,
				text: this.state.text
			},
			() => this.props.willAddPost(false)
		);
	};

	// Cancel new post (with confirmation prompt)
	cancelHandler = event => {
		event.preventDefault();

		if (this.state.img_url || this.state.text) {
			this.setState({
				confirm: {
					text: ['Do you want to discard these changes?'],
					cancel: event => {
						event.preventDefault();
						this.setState({ confirm: undefined });
					},
					submit: event => {
						event.preventDefault();
						this.props.willAddPost(false);
					}
				}
			});
		} else {
			this.props.willAddPost(false);
		}
	};

	render() {
		return (
			<PostContainer>
				{/* I can probably combine these */}
				{this.props.postType === 'text' ? (
					<PostForm onSubmit={this.submitHandler}>
						<p>You can add an image to this post at a later time</p>
						<TextInput
							name="text"
							type="text"
							placeholder="new text field"
							value={this.state.text}
							onChange={this.changeHandler}
							required
							autoFocus
						/>
						<PostButtonContainer>
							<CancelButton
								onClick={this.cancelHandler}
								disabled={this.props.addingPost || this.props.gettingProject}
							>
								Cancel
							</CancelButton>
							<SubmitInput
								type="submit"
								value="Add Text Field"
								disabled={this.props.addingPost || this.props.gettingProject}
							/>
						</PostButtonContainer>
					</PostForm>
				) : (
					<PostForm onSubmit={this.submitHandler}>
						<form>
							<input
								type="file"
								onChange={this.singleFileChangedHandler}
								disabled={this.props.addingPost || this.props.gettingProject}
							/>
							<div className="mt-5">
								<button
									className="btn btn-info"
									onClick={this.singleFileUploadHandler}
									disabled={this.props.addingPost || this.props.gettingProject}
								>
									Upload!
								</button>
								<Img
									src={this.state.img_url || 'placeholder image'}
									alt={this.state.img_url || 'placeholder image'}
								/>
							</div>
						</form>
						<TextInput
							name="text"
							type="text"
							placeholder="optional text description"
							value={this.state.text}
							onChange={this.changeHandler}
						/>
						<PostButtonContainer>
							<CancelButton
								onClick={this.cancelHandler}
								disabled={this.props.addingPost || this.props.gettingProject}
							>
								Cancel
							</CancelButton>
							<SubmitInput
								type="submit"
								value="Add Picture"
								disabled={this.props.addingPost || this.props.gettingProject}
							/>
						</PostButtonContainer>
					</PostForm>
				)}
				{(this.props.addingPost || this.props.gettingProject) && (
					<StatusMessage small>Adding new post...</StatusMessage>
				)}
				{this.props.addingPostError && (
					<StatusMessage small error>
						{this.props.addingPostError}
					</StatusMessage>
				)}
				{this.state.confirm && <ConfirmModal confirm={this.state.confirm} />}
			</PostContainer>
		);
	}
}

const mapStateToProps = state => {
	return {
		gettingProject: state.projectReducer.gettingProject,

		addingPost: state.postReducer.addingPost,
		addingPostError: state.postReducer.addingPostError
	};
};

export default connect(
	mapStateToProps,
	{
		addPost
	}
)(NewPost);
