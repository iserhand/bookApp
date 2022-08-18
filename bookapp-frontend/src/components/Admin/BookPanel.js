import React, { useState, useEffect } from 'react';
import List from '../List/List';
import TableCell from '@mui/material/TableCell';
import BookService from './../../service/BookService';
import AuthorService from './../../service/AuthorService';
import TableRow from '@mui/material/TableRow';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
function BookPanel(props) {
	const { setCurrentPage } = props;
	const [authors, setAuthors] = useState([{}]);
	const [data, setData] = useState([{}]);
	const [open, setOpen] = useState(false);
	const [snackBarMessage, setSnackBarMessage] = useState('Book has been removed successfully!');
	const [snackBarType, setSnackBarType] = useState('success');
	const [loading, setLoading] = useState(true);
	const handleClose = () => {
		setOpen(false);
	};
	useEffect(() => {
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
		async function fetchBooks() {
			const response = await BookService.getbooks();
			setData(response);
		}
		fetchBooks();
		setLoading(false);
	}, []);
	const headers = ['ID', 'Name', 'Author', 'Save', 'Remove'];
	const handleInsertSuccess = () => {
		setSnackBarMessage('Book has been added successfully!');
		setSnackBarType('success');
		setOpen(true);
		async function fetchBooks() {
			const response = await BookService.getbooks();
			setData(response);
		}
		fetchBooks();
	};
	const handleInsertFailed = () => {
		setSnackBarMessage('Could not add book,operation failed!');
		setSnackBarType('error');
		setOpen(true);
	};
	const handleRemove = async (event) => {
		let response = await BookService.removebook(event.target.value);
		if (response) {
			setSnackBarMessage('Book has been removed successfully!');
			setSnackBarType('success');
			setOpen(true);
			let remainingArr;
			remainingArr = data.filter((data) => data.id != event.target.value);
			setData(remainingArr);
		} else {
			setSnackBarMessage('Remove failed!');
			setSnackBarType('error');
			setOpen(true);
		}
	};
	const handleAuthorEdit = (event, index) => {
		let oldData = [...data];
		let oldObj = oldData[index];
		oldObj = { ...oldObj, author: { ...oldObj.author, id: event.target.value } };
		console.log(oldObj);
		oldData[index] = oldObj;
		setData(oldData);
	};
	const handleUserEdit = (event, index) => {
		let oldData = [...data];
		let oldObj = oldData[index];
		oldObj = { ...oldObj, [event.target.name]: event.target.value };
		oldData[index] = oldObj;
		setData(oldData);
	};
	const handleSave = async (index) => {
		const bookBody = data[index];
		let response = await BookService.savebook(bookBody);
		console.log(bookBody);
		if (response) {
			setSnackBarMessage('Book has been updated successfully!');
			setSnackBarType('success');
			setOpen(true);
		} else {
			setSnackBarMessage('Update failed!');
			setSnackBarType('error');
			setOpen(true);
		}
	};
	if (loading) {
		return <div>Loading</div>;
	} else {
		return (
			<>
				<List
					dialogType='book'
					isAdmin={true}
					headers={headers}
					title='Books'
					colspan={5}
					handleInsertSuccess={handleInsertSuccess}
					handleInsertFailed={handleInsertFailed}
				>
					{data.map((item, index) => {
						return (
							<TableRow key={index}>
								<TableCell>{item.id}</TableCell>
								<TableCell>
									<input
										name='name'
										value={data[index].name || ''}
										onChange={(event) =>
											handleUserEdit(event, index, data[index].name)
										}
										className='bg-inherit flex w-fit'
									></input>
								</TableCell>
								<TableCell className='bg-inherit flex w-fit'>
									<Select
										labelId='demo-simple-select-label'
										id='demo-simple-select'
										name='author.id'
										value={data[index]?.author?.id || ''}
										onChange={(event) =>
											handleAuthorEdit(event, index, data[index]?.author?.id)
										}
										label='Age'
									>
										{authors.map((author, index2) => {
											return (
												<MenuItem
													key={index2}
													value={authors[index2].id || ''}
												>
													{author?.name}
												</MenuItem>
											);
										})}
									</Select>
								</TableCell>
								<TableCell>
									<button
										className='bg-yellow-500 dark:md:hover:bg-yellow-400 rounded-md w-full h-full'
										onClick={() => handleSave(index)}
									>
										Save
									</button>
								</TableCell>
								<TableCell>
									<button
										value={item.id || ''}
										onClick={handleRemove}
										className='bg-red-800 dark:md:hover:bg-red-700 rounded-md'
									>
										Remove
									</button>
								</TableCell>
							</TableRow>
						);
					})}
				</List>
				<Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
					<Alert severity={snackBarType} sx={{ width: '100%' }}>
						{snackBarMessage}
					</Alert>
				</Snackbar>
				<Tabs
					value={1}
					orientation='vertical'
					variant='scrollable'
					aria-label='Vertical tabs example'
					sx={{
						borderRight: 1,
						borderColor: 'divider',
						backgroundColor: 'white',
						marginBottom: 20,
					}}
				>
					<Tab label='Users' onClick={() => setCurrentPage('users')} />
					<Tab
						sx={{
							backgroundColor: 'rgb(212, 212, 203)',
						}}
						label='Books'
					/>
					<Tab label='Authors' onClick={() => setCurrentPage('authors')} />
				</Tabs>
			</>
		);
	}
}

export default BookPanel;
