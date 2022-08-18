import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import NavBar from './components/NavBar/NavBar';
import HomePage from './pages/Home';
import LogOutPage from './pages/LogOutPage';
import AdminPage from './pages/AdminPage';
import { AuthProvider } from './context/AuthContext';
import ReadList from './pages/ReadList';
import FavoritesList from './pages/FavoritesList';
function App() {
	return (
		<div className='App '>
			<div className='overflow-hidden h-screen'>
				<AuthProvider>
					<Router>
						<NavBar></NavBar>
						<div className='flex items-center justify-center h-full bg-bg-library'>
							<Routes>
								<Route path='/' element={<HomePage />}></Route>
								<Route path='/login' element={<Login />}></Route>
								<Route path='/register' element={<Register />}></Route>
								<Route path='/logout' element={<LogOutPage />}></Route>
								<Route path='/readlist' element={<ReadList />}></Route>
								<Route path='/favorites' element={<FavoritesList />}></Route>
								<Route path='/admin' element={<AdminPage />}></Route>
							</Routes>
						</div>
					</Router>
				</AuthProvider>
			</div>
		</div>
	);
}

export default App;
