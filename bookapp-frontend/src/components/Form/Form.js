import React, { useState, useRef, useContext } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import AuthService from './../../service/AuthService';
import { useNavigate } from 'react-router-dom';
import AuthProvider from '../../context/AuthContext';
import LocalStorageUtil from '../../util/LocalStorageUtil';
import jwt_decode from 'jwt-decode';
function Form(props) {
	let { setName, setId, setIsAdmin, setIsLoggedIn } = useContext(AuthProvider);
	const navigate = useNavigate();
	let { formtype } = props;
	const [credentials, setCredentials] = useState({});
	const handleChange = (event) => {
		const name = event.target.name;
		const value = event.target.value;
		setCredentials((values) => ({ ...values, [name]: value }));
	};
	const handleSubmit = async (event) => {
		event.preventDefault();
		let response;
		if (formtype === 'Login') {
			response = await AuthService.signin(credentials);
		} else {
			response = await AuthService.signup(credentials);
			response = await AuthService.signin(credentials);
		}
		if (response) {
			setIsLoggedIn(true);
			setName(credentials.username);
			var decoded;
			var adminAuth = false;
			var userid = 0;
			const token = LocalStorageUtil.getToken();
			try {
				decoded = jwt_decode(token);
				adminAuth = false;
				userid = decoded.id || 0;
				decoded.authorities.forEach((item) => {
					if (item.authority === 'ROLE_ADMIN') {
						adminAuth = true;
					}
				});
				setId(userid);
				setIsAdmin(adminAuth);
			} catch (e) {}
			navigate('/');
		}
	};
	const captchaRef = useRef(null);
	return (
		<div className='w-full max-w-sm'>
			<form
				onSubmit={handleSubmit}
				className='bg-orange-300 shadow-md rounded px-8 pt-6 pb-8 mb-24'
			>
				<div className='mb-4'>
					<label className='block text-gray-700 text-sm font-bold mb-2'>Username</label>
					<input
						className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
						id='userName'
						type='text'
						name='username'
						required={true}
						value={credentials.username || ''}
						onChange={handleChange}
						placeholder='Username'
					/>
				</div>
				{formtype === 'Register' && (
					<div className='mb-4'>
						<label className='block text-gray-700 text-sm font-bold mb-2'>Email</label>
						<input
							className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
							id='email'
							required={true}
							type='email'
							name='email'
							value={credentials.email || ''}
							onChange={handleChange}
							placeholder='youremail@example.com'
						/>
					</div>
				)}
				<div className='mb-6'>
					<label className='block text-gray-700 text-sm font-bold mb-2'>Password</label>
					<input
						className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
						id='password'
						type='password'
						required={true}
						name='password'
						value={credentials.password || ''}
						onChange={handleChange}
						placeholder='******************'
					/>
				</div>
				{formtype === 'Register' && (
					<ReCAPTCHA
						className='items-center justify-center flex'
						sitekey='6Le6mmAhAAAAALEvrp_I12uHISAkWsQouCee9KCE'
						ref={captchaRef}
						onChange={onChange}
					/>
				)}
				<div className='flex items-center justify-center pt-3'>
					<button
						className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
						type='submit'
					>
						{formtype}
					</button>
				</div>
			</form>
		</div>
	);
	function onChange(value) {
		console.log('Captcha value:', value);
	}
}

export default Form;
