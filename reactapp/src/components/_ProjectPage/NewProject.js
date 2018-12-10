// Dependencies
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

// Components
import { ConfirmModal } from '../../components';

// Actions
import { addProject } from '../../actions';

// Styles
import styled from 'styled-components';

const NewProjectContainer = styled.div`
	width: 700px;
	background: #ffeeee;
	padding: 30px;
	margin: 0 auto;
`;

const StatusMessage = styled.p``;

const ProjectForm = styled.form`
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

const TextInput = styled.input``;

const CancelButton = styled.button``;

const SubmitInput = styled.input``;

const ProjectHeader = styled.div`
	display: flex;
	justify-content: space-between;
	margin-bottom: 20px;
`;

const ProjectNameInput = styled.input``;

const ProjectButtonContainer = styled.div`
	display: flex;
	justify-content: flex-end;
	margin-top: -12px;
	margin-bottom: 20px;
`;

class NewProject extends Component {
	state = {
		project_name: '',
		img_url: null,
		text: '',
		categories: []
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
								console.log(response.data.path);
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

	// Submit new project
	submitHandler = event => {
		event.preventDefault();

		this.props.addProject(
			{
				user_id: this.props.userInfo.user_id,
				project_name: this.state.project_name,
				img_url: this.state.img_url,
				text: this.state.text,
				categories: this.state.categories
			},
			url => this.setState({ redirect: url })
		);
	};

	// Cancel new project (with confirmation prompt)
	cancelHandler = event => {
		event.preventDefault();

		if (this.state.project_name || this.state.img_url || this.state.text) {
			this.setState({
				confirm: {
					text: ['Do you want to discard these changes?'],
					cancel: event => {
						event.preventDefault();
						this.setState({ confirm: undefined });
					},
					submit: event => {
						event.preventDefault();
						this.setState({ redirect: '/' });
					}
				}
			});
		} else {
			this.setState({ redirect: '/' });
		}
	};

	render() {
		return (
			<NewProjectContainer>
				{this.state.redirect && <Redirect push to={this.state.redirect} />}
				<ProjectForm onSubmit={this.submitHandler}>
					<ProjectHeader>
						<ProjectNameInput
							name="project_name"
							type="text"
							placeholder="project title"
							value={this.state.project_name}
							onChange={this.changeHandler}
							autoFocus
							required
						/>
					</ProjectHeader>
					<Img
						src={this.state.img_url || 'placeholder image'}
						alt={this.state.img_url || 'placeholder image'}
					/>
					<form>
						<input
							type="file"
							onChange={this.singleFileChangedHandler}
							disabled={this.props.addingProject}
						/>
						<div className="mt-5">
							<button
								className="btn btn-info"
								onClick={this.singleFileUploadHandler}
								disabled={this.props.addingProject}
							>
								Upload!
							</button>
						</div>
					</form>
					<TextInput
						name="text"
						type="text"
						placeholder="project description"
						value={this.state.text}
						onChange={this.changeHandler}
						required
					/>
					<ProjectButtonContainer>
						<CancelButton
							onClick={this.cancelHandler}
							disabled={this.props.addingProject}
						>
							Cancel
						</CancelButton>
						<SubmitInput
							type="submit"
							value="Add New Project"
							disabled={this.props.addingProject}
						/>
					</ProjectButtonContainer>
					{this.props.addingProject && (
						<StatusMessage small>Adding new project...</StatusMessage>
					)}
					{this.props.addingProjectError && (
						<StatusMessage small error>
							{this.props.addingProjectError}
						</StatusMessage>
					)}
				</ProjectForm>

				{this.state.confirm && <ConfirmModal confirm={this.state.confirm} />}
			</NewProjectContainer>
		);
	}
}

const mapStateToProps = state => {
	return {
		userInfo: state.loggedInReducer.userInfo,

		addingProject: state.projectReducer.addingProject,
		addingProjectError: state.projectReducer.addingProjectError
	};
};

export default connect(
	mapStateToProps,
	{
		addProject
	}
)(NewProject);
