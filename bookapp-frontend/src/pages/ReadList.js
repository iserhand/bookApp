import React, { useEffect, useState } from 'react';
import List from '../components/List/List';
import TableCell from '@mui/material/TableCell';
import ListService from '../service/ListService';
import TableRow from '@mui/material/TableRow';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
function ReadList() {
	const [books, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [open, setOpen] = useState(false);
	const [snackBarMessage, setSnackBarMessage] = useState('Book has been removed successfully!');
	const [snackBarType, setSnackBarType] = useState('success');

	useEffect(() => {
		async function fetchBooks() {
			const response = await ListService.getreadlist();
			setData(response);
			console.log(response);
			setLoading(false);
		}
		fetchBooks();
	}, []);
	const handleClose = () => {
		setOpen(false);
	};
	const handleRemove = async (e) => {
		let result = await ListService.removefromreadlist(e.target.value);
		if (result) {
			setSnackBarMessage('Successfully removed book from read list');
			setSnackBarType('success');
			setOpen(true);
			let remainingArr;
			remainingArr = books.filter((data) => data.id != e.target.value);
			setData(remainingArr);
		} else {
			setSnackBarMessage('Something went wrong');
			setSnackBarType('error');
			setOpen(true);
		}
	};
	const headers = ['Book Name', 'Author', 'Remove'];
	if (loading) {
		return <div>Loading</div>;
	} else if (books.length === 0)
		return (
			<div className='overflow-hidden h-screen w-screen'>
				<div className='flex items-center justify-center h-full'>
					<h1 className='bg-orange-200 text-7xl rounded-full p-12'>
						You do not have any books in your read list
					</h1>
				</div>
			</div>
		);
	else {
		return (
			<>
				<List headers={headers} title='ReadList' colspan={3}>
					{books.map((item, index) => {
						return (
							<TableRow key={item?.id}>
								<TableCell>{item?.name || 'Unknown'}</TableCell>
								<TableCell>{item?.author?.name || 'Unknown'}</TableCell>
								<TableCell>
									<button
										value={item.id || ''}
										className='bg-yellow-500 dark:md:hover:bg-yellow-400 rounded-md'
										onClick={handleRemove}
									>
										Remove from read list
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
			</>
		);
	}
}

export default ReadList;
