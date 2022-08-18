import React, { useState, useEffect } from 'react';
import List from '../List/List';
import TableCell from '@mui/material/TableCell';
import UserService from './../../service/UserService';
import TableRow from '@mui/material/TableRow';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
function UserPanel(props) {
	const { setCurrentPage } = props;
	const [data, setData] = useState([{}]);
	const [open, setOpen] = useState(false);
	const [snackBarMessage, setSnackBarMessage] = useState('User has been removed successfully!');
	const [snackBarType, setSnackBarType] = useState('success');
	const handleClose = () => {
		setOpen(false);
	};
	useEffect(() => {
		async function fetchUsers() {
			const response = await UserService.getusers();
			setData(response);
		}
		fetchUsers();
	}, []);
	const headers = ['ID', 'Name', 'Email', 'Save', 'Remove'];
	const handleInsertSuccess = () => {
		setSnackBarMessage('User has been added successfully!');
		setSnackBarType('success');
		setOpen(true);
		async function fetchUsers() {
			const response = await UserService.getusers();
			setData(response);
		}
		fetchUsers();
	};
	const handleInsertFailed = () => {
		setSnackBarMessage('Could not add user,operation failed!');
		setSnackBarType('error');
		setOpen(true);
	};
	const handleRemove = async (event) => {
		let response = await UserService.removeuser(event.target.value);
		if (response) {
			setSnackBarMessage('User has been removed successfully!');
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
	const handleChange = (event, newValue) => {};
	const handleSave = async (index) => {
		const userBody = data[index];
		let response = await UserService.saveuser(userBody);
		if (response) {
			setSnackBarMessage('User has been updated successfully!');
			setSnackBarType('success');
			setOpen(true);
		} else {
			setSnackBarMessage('Update failed!');
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
	return (
		<>
			<List
				dialogType='user'
				isAdmin={true}
				headers={headers}
				title='Users'
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
									name='username'
									value={data[index].username || ''}
									onChange={(event) =>
										handleUserEdit(event, index, data[index].username)
									}
									className='bg-inherit flex w-fit'
								></input>
							</TableCell>
							<TableCell className='bg-inherit flex w-fit'>
								<input
									name='email'
									value={data[index].email || ''}
									onChange={(event) =>
										handleUserEdit(event, index, data[index].username)
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
				onChange={handleChange}
				value={0}
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
				<Tab
					label='Users'
					sx={{
						backgroundColor: 'rgb(212, 212, 203)',
					}}
				/>
				<Tab label='Books' onClick={() => setCurrentPage('books')} />
				<Tab label='Authors' onClick={() => setCurrentPage('authors')} />
			</Tabs>
		</>
	);
}

export default UserPanel;
