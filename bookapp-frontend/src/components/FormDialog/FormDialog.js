import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import UserService from '../../service/UserService';
import BookService from '../../service/BookService';
import AuthorService from './../../service/AuthorService';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
export default function FormDialog(props) {
	const { open, handleClose, handleInsertFailed, handleInsertSuccess, dialogType } = props;
	const [dataBody, setDataBody] = useState({});
	const [authors, setAuthors] = useState([{}]);
	useEffect(() => {
		if (dialogType === 'book') {
			async function fetchAuthors() {
				const response = await AuthorService.getauthor();
				let authorArr = [];
				response.forEach((author) => {
					let newAuthor = { name: author.name, id: author.id };
					authorArr.push(newAuthor);
				});
				setAuthors(authorArr);
			}
			fetchAuthors();
		}
	}, [dialogType]);
	if (dialogType === 'book') {
	}
	const handleChange = (event) => {
		const name = event.target.name;
		const value = event.target.value;
		setDataBody((values) => ({ ...values, [name]: value }));
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		let response;
		if (dialogType === 'user') {
			response = await UserService.adduser(dataBody);
		} else if (dialogType === 'book') {
			const item = authors.filter((author) => {
				return dataBody.authorid === author.id;
			});
			let newBody = dataBody;
			newBody = { ...newBody, author: item[0] };
			response = await BookService.addbook(newBody);
		} else {
			response = await AuthorService.addauthor(dataBody);
		}
		if (response) {
			handleInsertSuccess();
		} else {
			handleInsertFailed();
		}

		setDataBody({});
		handleClose();
	};
	return (
		<Dialog open={open} onClose={handleClose}>
			{dialogType === 'user' && (
				<div>
					<DialogTitle>Add New User</DialogTitle>
					<DialogContent>
						<DialogContentText>Enter User Information</DialogContentText>
						<TextField
							autoFocus
							required={true}
							value={dataBody.username}
							margin='dense'
							name='username'
							id='username'
							label='Username'
							type='username'
							fullWidth
							onChange={handleChange}
							variant='standard'
						/>
						<TextField
							autoFocus
							required={true}
							value={dataBody.email}
							margin='dense'
							id='email'
							name='email'
							onChange={handleChange}
							label='Email Address'
							type='email'
							fullWidth
							variant='standard'
						/>
						<TextField
							required={true}
							autoFocus
							value={dataBody.password}
							margin='dense'
							id='password'
							name='password'
							onChange={handleChange}
							label='Password'
							type='password'
							fullWidth
							variant='standard'
						/>
					</DialogContent>
				</div>
			)}
			{dialogType === 'book' && (
				<div>
					<DialogTitle>Add New Book</DialogTitle>
					<DialogContent>
						<DialogContentText>Enter Book Information</DialogContentText>
						<TextField
							autoFocus
							required={true}
							value={dataBody.username}
							margin='normal'
							name='name'
							id='name'
							label='Book name'
							type='username'
							fullWidth
							onChange={handleChange}
							variant='standard'
						/>
						<InputLabel size='normal'>Publish date*</InputLabel>
						<TextField
							autoFocus
							required={true}
							value={dataBody.date}
							margin='normal'
							id='date'
							name='date'
							onChange={handleChange}
							type='date'
							fullWidth
							variant='standard'
						/>
						<TextField
							label='Genre'
							autoFocus
							required={true}
							value={dataBody.genre}
							margin='normal'
							id='genre'
							name='genre'
							onChange={handleChange}
							type='text'
							fullWidth
							variant='standard'
						/>
						<InputLabel size='normal'>Author*</InputLabel>
						<Select
							margin='normal'
							labelId='demo-simple-select-label'
							id='demo-simple-select'
							name='authorid'
							value={dataBody?.author?.id}
							onChange={handleChange}
							label='Age'
						>
							{authors.map((author, index) => {
								return (
									<MenuItem key={index} value={authors[index].id}>
										{author?.name}
									</MenuItem>
								);
							})}
						</Select>
					</DialogContent>
				</div>
			)}
			{dialogType === 'author' && (
				<div>
					<DialogTitle>Add New Author</DialogTitle>
					<DialogContent>
						<DialogContentText>Enter Author Information</DialogContentText>
						<TextField
							autoFocus
							required={true}
							value={dataBody.name}
							margin='dense'
							name='name'
							id='name'
							label='Author name'
							type='text'
							fullWidth
							onChange={handleChange}
							variant='standard'
						/>
						<InputLabel size='small'>Date of birth*</InputLabel>
						<TextField
							autoFocus
							required={true}
							value={dataBody.date}
							margin='dense'
							id='date_of_birth'
							name='date_of_birth'
							onChange={handleChange}
							type='date'
							fullWidth
							variant='standard'
						/>
					</DialogContent>
				</div>
			)}

			<DialogActions>
				<Button onClick={handleClose}>Cancel</Button>
				<Button onClick={handleSubmit}>Add</Button>
			</DialogActions>
		</Dialog>
	);
}
