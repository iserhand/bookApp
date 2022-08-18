import React, { useState, useEffect } from 'react';
import List from '../List/List';
import TableCell from '@mui/material/TableCell';
import AuthorService from './../../service/AuthorService';
import TableRow from '@mui/material/TableRow';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
function AuthorPanel(props) {
	const { setCurrentPage } = props;
	const [data, setData] = useState([{}]);
	const [open, setOpen] = useState(false);
	const [snackBarMessage, setSnackBarMessage] = useState('Author has been removed successfully!');
	const [snackBarType, setSnackBarType] = useState('success');
	const handleClose = () => {
		setOpen(false);
	};
	useEffect(() => {
		async function fetchAuthors() {
			const response = await AuthorService.getauthor();
			setData(response);
		}
		fetchAuthors();
	}, []);
	const headers = ['ID', 'Name', 'Birthdate', 'Save', 'Remove'];
	const handleInsertSuccess = () => {
		setSnackBarMessage('Author has been added successfully!');
		setSnackBarType('success');
		setOpen(true);
		async function fetchAuthors() {
			const response = await AuthorService.getauthor();
			setData(response);
		}
		fetchAuthors();
	};
	const handleInsertFailed = () => {
		setSnackBarMessage('Could not add Author,operation failed!');
		setSnackBarType('error');
		setOpen(true);
	};
	const handleRemove = async (event) => {
		let response = await AuthorService.removeauthor(event.target.value);
		if (response) {
			setSnackBarMessage('Author has been removed successfully!');
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
	const handleUserEdit = (event, index) => {
		let oldData = [...data];
		let oldObj = oldData[index];
		oldObj = { ...oldObj, [event.target.name]: event.target.value };
		oldData[index] = oldObj;
		setData(oldData);
	};
	const handleSave = async (index) => {
		const authorBody = data[index];
		let response = await AuthorService.saveauthor(authorBody);
		if (response) {
			setSnackBarMessage('Author has been updated successfully!');
			setSnackBarType('success');
			setOpen(true);
		} else {
			setSnackBarMessage('Update failed!');
			setSnackBarType('error');
			setOpen(true);
		}
	};

	return (
		<>
			<List
				dialogType='author'
				isAdmin={true}
				headers={headers}
				title='Authors'
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
								<input
									type='date'
									name='date_of_birth'
									value={data[index].date_of_birth || ''}
									onChange={(event) =>
										handleUserEdit(event, index, data[index].date_of_birth)
									}
									className='bg-inherit flex w-fit'
								></input>
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
				orientation='vertical'
				variant='scrollable'
				aria-label='Vertical tabs example'
				value={2}
				sx={{
					borderRight: 1,
					borderColor: 'divider',
					backgroundColor: 'white',
					marginBottom: 20,
				}}
			>
				<Tab label='Users' onClick={() => setCurrentPage('users')} />
				<Tab label='Books' onClick={() => setCurrentPage('books')} />
				<Tab
					sx={{
						backgroundColor: 'rgb(212, 212, 203)',
					}}
					label='Authors'
				/>
			</Tabs>
		</>
	);
}
export default AuthorPanel;
