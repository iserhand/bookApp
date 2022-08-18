import axios from 'axios';
import LocalStorageUtil from '../util/LocalStorageUtil';

const AuthService = (function () {
	const _signin = async (credentials) => {
		let token = null;
		try {
			const response = await axios.post('http://localhost:8080/authenticate', credentials);
			if (response && response.data) {
				token = response.data.token;
				LocalStorageUtil.setToken(token);
			}
		} catch (error) {
			console.log(error);
		}

		return token;
	};
	const _signup = async (credentials) => {
		let token = null;
		try {
			const response = await axios.post('http://localhost:8080/register', credentials);
			if (response && response.data) {
				_signin(credentials);
			}
		} catch (error) {
			console.log(error);
		}

		return token;
	};

	return {
		signin: _signin,
		signup: _signup,
	};
})();

export default AuthService;
