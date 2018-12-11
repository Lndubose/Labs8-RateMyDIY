// Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

// Components
import { StarCount, ConfirmModal } from '../../components';

// Actions
import { updateProject } from '../../actions';

// Styles
import styled from 'styled-components';

const ProjectForm = styled.form`
	background: #ffcccc;
`;

const Img = styled.img`
	display: block;
	width: 100%;
	background: #cceeee;
	margin: 0 auto 20px auto;
	box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
`;
const HiddenInputFileForm = styled.input`
	display: none;
`;

// const FileLabel = styled.label`
// 	font-size: 1.25em;
// 	font-weight: 700;
// 	color: white;
// 	background-color: black;
// 	display: inline-block;
// `;

const TextInput = styled.input``;

const CancelButton = styled.button``;

const SubmitInput = styled.input``;

const ProjectHeader = styled.div`
	display: flex;
	justify-content: space-between;
	margin-bottom: 20px;
`;

const ReviewsButton = styled.button``;

const ProjectNameInput = styled.input``;

const ProjectButtonContainer = styled.div`
	display: flex;
	justify-content: flex-end;
	margin-top: -12px;
	margin-bottom: 20px;
`;

const StatusMessage = styled.p``;

class EditProject extends Component {
	state = {
		project_name: '',
		img_url: null,
		text: '',
		categories: [],
		selectedFile: null
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
					process.env.REACT_APP_BACKEND ||
						'http://localhost:5000/api/projects/image-upload',
					data,
					{
						onUploadProgress: progressEvent => {
							// display progress percentage in console
							console.log(
								'Upload Progress: ' +
									Math.round(
										(progressEvent.loaded / progressEvent.total) * 100
									) +
									'%'
							);
						}
					},
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

	// Submit changes
	submitHandler = event => {
		event.preventDefault();
		this.props.updateProject(
			this.props.project.project_id,
			{
				user_id: this.props.user_id,
				project_name: this.state.project_name,
				img_url: this.state.img_url,
				text: this.state.text,
				categories: this.state.categories
			},
			() => this.props.willUpdateProject(false)
		);
	};

	// Discard changes (with confirmation prompt)
	cancelHandler = event => {
		event.preventDefault();

		if (
			this.state.project_name === this.props.project.project_name &&
			this.state.img_url === this.props.project.img_url &&
			this.state.text === this.props.project.text
		) {
			this.props.willUpdateProject(false);
		} else {
			this.setState({
				confirm: {
					text: ['Do you want to discard these changes?'],
					cancel: event => {
						event.preventDefault();
						this.setState({ confirm: undefined });
					},
					submit: event => {
						event.preventDefault();
						this.props.willUpdateProject(false);
					}
				}
			});
		}
	};

	componentDidMount() {
		this.setState({
			project_name: this.props.project.project_name,
			img_url: this.props.project.img_url,
			text: this.props.project.text
		});
	}

	render() {
		return (
			<ProjectForm onSubmit={this.submitHandler}>
				<ProjectHeader>
					<ProjectNameInput
						name="project_name"
						type="text"
						placeholder="project title"
						value={this.state.project_name}
						onChange={this.changeHandler}
						required
					/>
					<StarCount rating={this.props.project.rating} />
					<ReviewsButton disabled>Reviews</ReviewsButton>
				</ProjectHeader>
				<Img
					src={this.props.project.img_url}
					alt={this.props.project.img_url || 'project image'}
				/>
				<form>
					{/* HiddenInputFileForm is hidden */}
					<HiddenInputFileForm
						type="file"
						name="file"
						onChange={this.singleFileChangedHandler}
						ref={fileInput => (this.fileInput = fileInput)}
					/>
					<button
						onClick={() => this.fileInput.click()}
						disabled={this.props.updatingProject || this.props.gettingProject}
					>
						{this.state.selectedFile
							? this.state.selectedFile.name
							: 'Pick File'}
					</button>
					<div className="mt-5">
						<button
							className="btn btn-info"
							onClick={this.singleFileUploadHandler}
							disabled={this.props.updatingProject || this.props.gettingProject}
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
						disabled={this.props.updatingProject || this.props.gettingProject}
					>
						Cancel
					</CancelButton>
					<SubmitInput
						type="submit"
						value="Submit Changes"
						disabled={this.props.updatingProject || this.props.gettingProject}
					/>
				</ProjectButtonContainer>

				{(this.props.updatingProject || this.props.gettingProject) && (
					<StatusMessage small>Updating project...</StatusMessage>
				)}
				{this.props.updatingProjectError && (
					<StatusMessage small error>
						{this.props.updatingProjectError}
					</StatusMessage>
				)}

				{this.state.confirm && <ConfirmModal confirm={this.state.confirm} />}
			</ProjectForm>
		);
	}
}

const mapStateToProps = state => {
	return {
		gettingProject: state.projectReducer.gettingProject,

		updatingProject: state.projectReducer.updatingProject,
		updatingProjectError: state.projectReducer.updatingProjectError
	};
};

export default connect(
	mapStateToProps,
	{
		updateProject
	}
)(EditProject);
