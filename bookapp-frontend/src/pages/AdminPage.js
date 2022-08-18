import React, { useState } from 'react';
import UserPanel from '../components/Admin/UserPanel';
import BookPanel from '../components/Admin/BookPanel';
import AuthorPanel from '../components/Admin/AuthorPanel';
function AdminPage() {
	const [currentPage, setCurrentPage] = useState('users');
	if (currentPage === 'users') {
		return <UserPanel setCurrentPage={setCurrentPage}></UserPanel>;
	} else if (currentPage === 'books') {
		return <BookPanel setCurrentPage={setCurrentPage}></BookPanel>;
	} else {
		return <AuthorPanel setCurrentPage={setCurrentPage}></AuthorPanel>;
	}
}

export default AdminPage;
