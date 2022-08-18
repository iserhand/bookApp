import React from 'react';
import Form from '../components/Form/Form';
function Login() {
	return (
		<div className='overflow-hidden h-screen'>
			<div className='flex items-center justify-center h-full'>
				<Form formtype='Login'></Form>
			</div>
		</div>
	);
}

export default Login;
