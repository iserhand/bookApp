import axios from 'axios';
const BookService = (function () {
	const _getbooks = async () => {
		let response = null;
		let returndata = null;
		try {
			response = await axios.get('http://localhost:8080/api/book/all');
			if (response && response.data) {
				returndata = response.data;
			}
		} catch (error) {
			console.log(error);
		}
		return returndata;
	};
	const _getbookssearch = async (searchValue) => {
		let response = null;
		let returndata = null;
		try {
			response = await axios.get('http://localhost:8080/api/book/search/' + searchValue);
			if (response && response.data) {
				returndata = response.data;
			}
		} catch (error) {
			console.log(error);
		}
		return returndata;
	};
	const _getfavorites = async () => {
		let response = null;
		let returndata = null;
		try {
			response = await axios.get('http://localhost:8080/api/list/favorites');
			if (response && response.data) {
				returndata = response.data;
			}
		} catch (error) {
			console.log(error);
		}
		return returndata;
	};
	const _getreadlist = async () => {
		let response = null;
		let returndata = null;
		try {
			response = await axios.get('http://localhost:8080/api/list/read-list');
			if (response && response.data) {
				returndata = response.data;
			}
		} catch (error) {
			console.log(error);
		}
		return returndata;
	};
	const _removebook = async (id) => {
		let response = false;
		try {
			response = await axios.delete('http://localhost:8080/api/book/' + id);
			response = true;
		} catch (error) {
			console.log(error);
			response = false;
		}
		return response;
	};
	const _addbook = async (body) => {
		console.log(body);
		let response = false;
		try {
			response = await axios.post('http://localhost:8080/api/book/', body);
			response = true;
		} catch (error) {
			console.log(error);
			response = false;
		}
		return response;
	};
	const _savebook = async (body) => {
		let success = false;
		try {
			await axios.put('http://localhost:8080/api/book/', body);
			success = true;
		} catch (error) {
			console.log(error);
		}
		return success;
	};

	return {
		getbooks: _getbooks,
		getfavorites: _getfavorites,
		getreadlist: _getreadlist,
		removebook: _removebook,
		addbook: _addbook,
		savebook: _savebook,
		getbookssearch: _getbookssearch,
	};
})();

export default BookService;
