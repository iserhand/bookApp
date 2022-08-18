import React, { useContext } from 'react';
import AuthProvider from '../context/AuthContext';
import LocalStorageUtil from '../util/LocalStorageUtil';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
function LogOutPage() {
	let { setName, setId, setIsAdmin, setIsLoggedIn, isLoggedIn } = useContext(AuthProvider);
	const open = isLoggedIn;
	setName('none');
	setId(-1);
	setIsAdmin(false);
	setIsLoggedIn(false);
	LocalStorageUtil.clearToken();
	return (
		<Snackbar open={open} autoHideDuration={3000}>
			<Alert severity='success' sx={{ width: '100%' }}>
				You have successfully logged out!
			</Alert>
		</Snackbar>
	);
}

export default LogOutPage;
