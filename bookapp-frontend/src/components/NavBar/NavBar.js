import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MoreIcon from '@mui/icons-material/MoreVert';
import LoginIcon from '@mui/icons-material/Login';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import AuthProvider from '../../context/AuthContext';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import UserService from '../../service/UserService';
const Search = styled('div')(({ theme }) => ({
	position: 'relative',
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha(theme.palette.error.dark, 0.15),
	'&:hover': {
		backgroundColor: alpha(theme.palette.error.dark, 0.25),
	},
	marginRight: theme.spacing(2),
	marginLeft: 0,
	width: '100%',
	[theme.breakpoints.up('sm')]: {
		marginLeft: theme.spacing(3),
		width: 'auto',
	},
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: '100%',
	position: 'absolute',
	pointerEvents: 'none',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: 'inherit',
	'& .MuiInputBase-input': {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('md')]: {
			width: '20ch',
		},
	},
}));

export default function NavBar() {
	const { name, id, isAdmin, isLoggedIn, setSearchValue } = useContext(AuthProvider);
	const [anchorEl, setAnchorEl] = React.useState(null);
	const isMenuOpen = Boolean(anchorEl);
	const [open, setOpen] = useState(false);
	const [userData, setUserData] = React.useState({});
	const handleProfileMenuOpen = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleMenuClose = () => {
		setAnchorEl(null);
	};
	const handleOpen = () => {
		setOpen(true);
		async function getUserInfo() {
			const response = await UserService.getme();
			setUserData(response);
		}
		getUserInfo();
	};
	const handleClose = () => {
		setOpen(false);
	};
	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position='static'>
				<Toolbar className='bg-orange-300'>
					<button>
						<Link to='/'>
							<Typography
								variant='h6'
								noWrap
								component='div'
								sx={{ display: { xs: 'none', sm: 'block' } }}
							>
								<div className='text-2xl'>BookApp</div>
							</Typography>
						</Link>
					</button>
					<Search>
						<SearchIconWrapper>
							<SearchIcon />
						</SearchIconWrapper>
						<StyledInputBase
							onChange={(e) => setSearchValue(e.target.value)}
							placeholder='Search…'
							inputProps={{ 'aria-label': 'search' }}
						/>
					</Search>
					<Box sx={{ flexGrow: 1 }} />
					<Box sx={{ display: { xs: 'none', md: 'flex' } }}>
						{!isLoggedIn && (
							<>
								<Link to='/login'>
									<IconButton size='small' value={'/login'} color='inherit'>
										<LoginIcon />
										Login
									</IconButton>
								</Link>
								<Link to='/register'>
									<IconButton size='small' value='/register' color='inherit'>
										<LockOpenIcon />
										Register
									</IconButton>
								</Link>
							</>
						)}

						{isLoggedIn && (
							<>
								<IconButton
									size='small'
									aria-haspopup='true'
									onClick={handleProfileMenuOpen}
									color='inherit'
								>
									{name}
									<AccountCircle />
								</IconButton>
								<Menu
									sx={{ mt: '30px' }}
									anchorOrigin={{
										vertical: 'top',
										horizontal: 'right',
									}}
									keepMounted
									transformOrigin={{
										vertical: 'top',
										horizontal: 'right',
									}}
									open={isMenuOpen}
									onClose={handleMenuClose}
								>
									<MenuItem onClick={handleOpen}>My Profile</MenuItem>
									<Link to='/favorites'>
										<MenuItem>My Favorite Books</MenuItem>
									</Link>
									<Link to='/readlist'>
										<MenuItem>My Read List</MenuItem>
									</Link>
									{isAdmin && (
										<Link to='/admin'>
											<MenuItem>Admin Panel</MenuItem>
										</Link>
									)}
									<Link to='/logout'>
										<MenuItem>Log out</MenuItem>
									</Link>
								</Menu>
							</>
						)}
					</Box>
					<Box sx={{ display: { xs: 'flex', md: 'none' } }}>
						<IconButton
							size='large'
							aria-label='show more'
							aria-haspopup='true'
							color='inherit'
						>
							<MoreIcon />
						</IconButton>
					</Box>
				</Toolbar>
			</AppBar>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby='scroll-dialog-title'
				aria-describedby='scroll-dialog-description'
			>
				<DialogTitle id='scroll-dialog-title'>My profile</DialogTitle>
				<DialogContent>
					<DialogContentText id='scroll-dialog-description' tabIndex={-1}>
						<div>Name:{userData?.username}</div>
						<div>E-mail:{userData?.email}</div>
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Close</Button>
				</DialogActions>
			</Dialog>
		</Box>
	);
}
