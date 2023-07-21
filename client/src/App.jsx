import { useEffect, useState } from 'react';
import EditUser from './components/EditUser/EditUser';
import Users from './components/Users/Users';
import CreateUser from './components/createUser/CreateUser';
import { GlobalStyles } from './styles/GlobalStyles';

const App = () => {
	const [isEditing, setIsEditing] = useState(false);
	const [userToEdit, setUserToEdit] = useState({
		id: '',
		name: '',
		email: ''
	});
	const [users, setUsers] = useState([]);
	useEffect(() => {
		getAllUsers(setUsers);
	}, []);
	return (
		<>
			<GlobalStyles />
			{isEditing ? (
				<EditUser
					setUsers={setUsers}
					userToEdit={userToEdit}
					setUserToEdit={setUserToEdit}
					setIsEditing={setIsEditing}
				/>
			) : (
				<CreateUser setUsers={setUsers} />
			)}

			<Users
				users={users}
				setUsers={setUsers}
				setIsEditing={setIsEditing}
				setUserToEdit={setUserToEdit}
			/>
		</>
	);
};

const getAllUsers = async setUsers => {
	const response = await fetch('http://localhost:3000/api/users');
	const data = await response.json();
	setUsers(data);
};

export default App;
