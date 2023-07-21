import { useState } from 'react';

const CreateUser = ({ setUsers }) => {
	const [userData, setUserData] = useState({
		name: '',
		email: ''
	});

	return (
		<form onSubmit={e => handleSubmit(e, userData, setUsers)}>
			<div>
				<label htmlFor='name'>Name</label>
				<input
					onInput={e => setUserData({ ...userData, name: e.target.value })}
					type='text'
					name='name'
					id='name'
				/>
			</div>

			<div>
				<label htmlFor='email'>Email</label>
				<input
					onInput={e => setUserData({ ...userData, email: e.target.value })}
					type='text'
					name='email'
					id='email'
				/>
			</div>
			<input type='submit' value='Crear Usuario' />
		</form>
	);
};

const handleSubmit = async (event, userData, setUsers) => {
	event.preventDefault();
	const response = await fetch('http://localhost:3000/api/users', {
		method: 'POST',
		body: JSON.stringify(userData),
		headers: {
			Accept: '*/*',
			'Content-Type': 'application/json'
		}
	});
	const data = await response.json();
	console.log(data);
	setUsers(data);
};

export default CreateUser;
