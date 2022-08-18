import axios from 'axios';
const ListService = (function () {
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
	const _addtoreadlist = async (id) => {
		let returndata = false;
		try {
			await axios.put('http://localhost:8080/api/list/read-list/' + id);
			returndata = true;
		} catch (error) {
			console.log(error);
			returndata = false;
		}
		return returndata;
	};
	const _addtofavorites = async (id) => {
		let returndata = false;
		try {
			await axios.put('http://localhost:8080/api/list/favorites/' + id);
			returndata = true;
		} catch (error) {
			console.log(error);
			returndata = false;
		}
		return returndata;
	};
	const _removefromreadlist = async (id) => {
		let returndata = false;
		try {
			await axios.delete('http://localhost:8080/api/list/read-list/' + id);
			returndata = true;
		} catch (error) {
			console.log(error);
			returndata = false;
		}
		return returndata;
	};
	const _removefromfavorites = async (id) => {
		let returndata = false;
		try {
			await axios.delete('http://localhost:8080/api/list/favorites/' + id);
			returndata = true;
		} catch (error) {
			console.log(error);
			returndata = false;
		}
		return returndata;
	};

	return {
		getfavorites: _getfavorites,
		getreadlist: _getreadlist,
		addtofavorites: _addtofavorites,
		addtoreadlist: _addtoreadlist,
		removefromreadlist: _removefromreadlist,
		removefromfavorites: _removefromfavorites,
	};
})();

export default ListService;
