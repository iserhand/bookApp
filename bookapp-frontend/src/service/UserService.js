import axios from 'axios';

const AuthService = (function () {
	const _getusers = async () => {
		let response = null;
		let returndata = null;
		try {
			response = await axios.get('http://localhost:8080/api/user/all');
			if (response && response.data) {
				returndata = response.data;
			}
		} catch (error) {
			console.log(error);
		}

		return returndata;
	};
	const _removeuser = async (id) => {
		let success = false;
		try {
			await axios.delete('http://localhost:8080/api/user/' + id);
			success = true;
		} catch (error) {
			console.log(error);
		}
		return success;
	};
	const _adduser = async (body) => {
		let success = false;

		try {
			await axios.post('http://localhost:8080/api/user', body);
			success = true;
		} catch (error) {
			console.log(error);
		}
		return success;
	};
	const _saveuser = async (body) => {
		let success = false;
		try {
			await axios.put('http://localhost:8080/api/user', body);
			success = true;
		} catch (error) {
			console.log(error);
		}
		return success;
	};
	const _getme = async () => {
		let response = null;
		let returndata = null;
		try {
			response = await axios.get('http://localhost:8080/api/user/me');
			if (response && response.data) {
				returndata = response.data;
			}
		} catch (error) {
			console.log(error);
		}

		return returndata;
	};

	return {
		getusers: _getusers,
		removeuser: _removeuser,
		adduser: _adduser,
		saveuser: _saveuser,
		getme: _getme,
	};
})();

export default AuthService;
