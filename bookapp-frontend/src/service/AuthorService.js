import axios from 'axios';
const AuthorService = (function () {
	const _getauthor = async (id) => {
		let response = null;
		let returndata = null;
		try {
			response = await axios.get('http://localhost:8080/api/author/' + id);
			if (response && response.data) {
				returndata = response.data;
			}
		} catch (error) {
			console.log(error);
		}
		return returndata;
	};
	const _getauthors = async () => {
		let response = null;
		let returndata = null;
		try {
			response = await axios.get('http://localhost:8080/api/author/');
			if (response && response.data) {
				returndata = response.data;
			}
		} catch (error) {
			console.log(error);
		}
		return returndata;
	};

	const _removeauthor = async (id) => {
		let response = false;
		try {
			response = await axios.delete('http://localhost:8080/api/author/' + id);
			response = true;
		} catch (error) {
			console.log(error);
			response = false;
		}
		return response;
	};

	const _saveauthor = async (body) => {
		let success = false;
		try {
			await axios.put('http://localhost:8080/api/author/', body);
			success = true;
		} catch (error) {
			console.log(error);
		}
		return success;
	};
	const _addauthor = async (body) => {
		let success = false;
		try {
			await axios.post('http://localhost:8080/api/author/', body);
			success = true;
		} catch (error) {
			console.log(error);
		}
		return success;
	};

	return {
		getauthor: _getauthors,
		removeauthor: _removeauthor,
		saveauthor: _saveauthor,
		addauthor: _addauthor,
		getauthorbyid: _getauthor,
	};
})();

export default AuthorService;
