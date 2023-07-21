import { useEffect, useState } from 'react';
import CreateUser from './components/CreateUser/CreateUser';
import Users from './components/Users/Users';
import { GlobalStyles } from './styles/GlobalStyles';

const App = () => {
	const [users, setUsers] = useState([]);
	useEffect(() => {
		getAllUsers(setUsers);
	}, []);
	return (
		<>
			<GlobalStyles />
			<CreateUser setUsers={setUsers} />
			<Users users={users} setUsers={setUsers} />
		</>
	);
};

const getAllUsers = async setUsers => {
	const response = await fetch('http://localhost:3000/api/users');
	const data = await response.json();
	setUsers(data);
};

export default App;
