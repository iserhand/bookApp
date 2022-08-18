import React, { useContext, useEffect, useState } from 'react';
import AuthProvider from '../context/AuthContext';
import List from './../components/List/List';
import BookService from '../service/BookService';
import ListService from '../service/ListService';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import AuthorService from '../service/AuthorService';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
function Home() {
	const { isLoggedIn, searchValue } = useContext(AuthProvider);
	const [data, setData] = useState([{}]);
	const [open, setOpen] = useState(false);
	const [popUpAuthor, setPopUpAuthor] = useState({});
	const [snackBarMessage, setSnackBarMessage] = useState('Success');
	const [snackBarType, setSnackBarType] = useState('success');
	const [authorPopUpOpen, setAuthorPopUpOpen] = useState(false);
	const [seeAllBooks, setSeeAllBooks] = useState(false);
	const [title, setTitle] = useState('Author Information');
	const descriptionElementRef = React.useRef(null);
	React.useEffect(() => {
		if (authorPopUpOpen) {
			const { current: descriptionElement } = descriptionElementRef;
			if (descriptionElement !== null) {
				descriptionElement.focus();
			}
		}
	}, [authorPopUpOpen]);
	const handlePopUpClose = () => {
		setAuthorPopUpOpen(false);
		setSeeAllBooks(false);
		setTitle('Author Information');
	};
	const handleClose = () => {
		setOpen(false);
	};
	const handleSeeAllBooks = () => {
		setSeeAllBooks(true);
		setTitle('Books of Author');
	};
	useEffect(() => {
		async function fetchBooks() {
			if (searchValue.length == 0) {
				const response = await BookService.getbooks();
				setData(response);
			} else {
				const response = await BookService.getbookssearch(searchValue);
				setData(response);
			}
		}
		fetchBooks();
		console.log(searchValue);
	}, [searchValue]);
	const openAuthorDialog = (e) => {
		async function fetchAuthor() {
			const response = await AuthorService.getauthorbyid(e.target.value);
			console.log(e.target);
			console.log(e.target.value);
			setPopUpAuthor(response);
			setAuthorPopUpOpen(true);
		}
		fetchAuthor();
	};
	const headers = ['Name', 'Author', 'Add To Read List', 'Add to Favorites'];
	const addToReadList = async (e) => {
		let result = await ListService.addtoreadlist(e.target.value);
		if (result) {
			setSnackBarMessage('Successfully added book to read list');
			setSnackBarType('success');
			setOpen(true);
		} else {
			setSnackBarMessage('Something went wrong');
			setSnackBarType('error');
			setOpen(true);
		}
	};
	const addToFavorites = async (e) => {
		let result = await ListService.addtofavorites(e.target.value);
		if (result) {
			setSnackBarMessage('Successfully added book to favorites');
			setSnackBarType('success');
			setOpen(true);
		} else {
			setSnackBarMessage('Something went wrong');
			setSnackBarType('error');
			setOpen(true);
		}
	};
	if (isLoggedIn) {
		return (
			<>
				<List dialogType='book' isAdmin={false} headers={headers} title='Books' colspan={5}>
					{data.map((item, index) => {
						return (
							<TableRow key={index}>
								<TableCell>{data[index]?.name || ''}</TableCell>
								<TableCell>
									<button
										onClick={(e) => openAuthorDialog(e)}
										value={data[index]?.author?.id}
									>
										{data[index]?.author?.name || ''}
									</button>
								</TableCell>
								<TableCell>
									<button
										value={item.id || ''}
										className='bg-yellow-500 dark:md:hover:bg-yellow-400 rounded-md'
										onClick={addToReadList}
									>
										Add To Read List
									</button>
								</TableCell>
								<TableCell>
									<button
										value={item.id || ''}
										className='bg-yellow-500 dark:md:hover:bg-yellow-400 rounded-md'
										onClick={addToFavorites}
									>
										Add To Favorites
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
				<Dialog
					className='text-center'
					open={authorPopUpOpen}
					onClose={() => handlePopUpClose()}
					aria-labelledby='scroll-dialog-title'
					aria-describedby='scroll-dialog-description'
				>
					<DialogTitle id='scroll-dialog-title'>{title}</DialogTitle>
					<DialogContent>
						<DialogContentText
							id='scroll-dialog-description'
							ref={descriptionElementRef}
							tabIndex={-1}
						>
							{' '}
							{seeAllBooks &&
								popUpAuthor?.books?.map((book) => {
									return <div>{book?.name}</div>;
								})}
							{!seeAllBooks && (
								<div>
									<div>Name: {popUpAuthor?.name || ''}</div>
									<div>Date of birth: {popUpAuthor?.date_of_birth || ''}</div>
									<div>Number of books: {popUpAuthor?.books?.length || ''}</div>
								</div>
							)}
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button onClick={handlePopUpClose}>Close</Button>
						{!seeAllBooks && <Button onClick={handleSeeAllBooks}>See all books</Button>}
						{seeAllBooks && (
							<Button
								onClick={() => {
									setSeeAllBooks(false);
								}}
							>
								Go back to author page
							</Button>
						)}
					</DialogActions>
				</Dialog>
			</>
		);
	} else {
		return (
			<div className='overflow-hidden h-screen w-screen'>
				<div className='flex items-center justify-center h-full'>
					<h1 className='bg-orange-200 text-7xl rounded-full p-12'>
						Welcome stranger! Please log-in or register
					</h1>
				</div>
			</div>
		);
	}
}

export default Home;
