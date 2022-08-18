import React, { createContext, useState } from 'react';
import jwt_decode from 'jwt-decode';
import LocalStorageUtil from '../util/LocalStorageUtil';
const AuthContext = createContext();
export function AuthProvider({ children }) {
	var decoded;
	var adminAuth = false;
	var username = '';
	var userid = 0;
	var userAuth = false;
	const token = LocalStorageUtil.getToken();
	try {
		decoded = jwt_decode(token);
		adminAuth = false;
		username = decoded.sub || '';
		userid = decoded.id || 0;
		decoded.authorities.forEach((item) => {
			if (item.authority === 'ROLE_ADMIN') {
				adminAuth = true;
			} else if (item.authority === 'ROLE_USER') {
				userAuth = true;
			}
		});
	} catch (e) {}
	const [searchValue, setSearchValue] = useState('');
	const [name, setName] = useState(username);
	const [id, setId] = useState(userid);
	const [isAdmin, setIsAdmin] = useState(adminAuth);
	const [isLoggedIn, setIsLoggedIn] = useState(adminAuth || userAuth);
	return (
		<AuthContext.Provider
			value={{
				name,
				id,
				isAdmin,
				isLoggedIn,
				setName,
				setId,
				setIsAdmin,
				setIsLoggedIn,
				searchValue,
				setSearchValue,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}
export default AuthContext;
